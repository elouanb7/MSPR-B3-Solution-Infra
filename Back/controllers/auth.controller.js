const config = require("../config/ad.config");
const bcrypt = require("bcryptjs");
const db = require("../models");
const requestIP = require("request-ip");
const { authenticator } = require("otplib");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const {
  send2FAByMail,
  sendInformationMail,
} = require("../services/common.service");
const ActiveDirectory = require("activedirectory2");
const { v4: uuidv4 } = require("uuid");

/*exports.generateOtp = async (req, res) => {
  const otp = authenticator.generateSecret();

  const { ascii, hex, base32, otpauth_url } = speakeasy.generateSecret({
    issuer: "Hopital - Le Chatelet",
    name: "elouanb7@gmail.com",
    length: 15,
  });

  return res.send(base32);
};*/

exports.verifyCredentials = async (req, res) => {
  /*  const secret = speakeasy.generateSecret({ length: 20 });
  console.log("secret", secret);
  qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    console.log("qrcode", data);
  });*/
  const ad = new ActiveDirectory(config);
  const { username, password } = req.body;
  ad.authenticate(username, password, (err, auth) => {
    if (err) {
      console.log("Erreur d'authentification : " + JSON.stringify(err));
      res.status(500).send({ error: "Erreur d'authentification." });
    } else if (!auth) {
      console.log("Nom d'utilisateur ou mot de passe incorrect.");
      res
        .status(401)
        .send({ error: "Nom d'utilisateur ou mot de passe incorrect." });
    } else {
      req.session.authenticated = true;
      req.session.username = username;
      req.session.token = uuidv4();
      console.log(req.session);
      console.log("Authentification réussie pour l'utilisateur : " + username);
      res.json({ token: req.session.token, username: req.session.username });
    }
  });
};

exports.logout = async (req, res) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  // if (token !== req.session.token) {
  //   res.status(401).send({ error: "Invalid session token" });
  //   return;
  // }

  req.session.destroy(() => {
    res.send({ message: "Logout successful" });
  });
};

exports.verifyOtp = async (req, res) => {
  const ad = new ActiveDirectory(config);
  // ad.authenticate(username, password, function(err, auth) {
  //   if (err) {
  //     return res.status(401).send();
  //   }
  //   if (!auth) {
  //     return res.status(401).send();
  //   }
  // });

  const { username, password, otpCode, remember } = req.body;

  if (!username || !password || !otpCode) {
    return res.status(401).send("nul germain");
  }

  const userOtp = await db.User.findOne({
    where: { username: username },
  });

  const verifiedOtp = speakeasy.totp.verify({
    secret: userOtp.otp_base32,
    encoding: "base32",
    token: otpCode,
  });
  if (!verifiedOtp) {
    return res.status(401).send();
  }

  const logConnection = await db.LogConnection.findAll({
    where: {
      useragent: req.headers["user-agent"],
    },
  });

  if (
    logConnection.length < 1 ||
    logConnection.filter((log) => log.isVerified === true).length < 1
  ) {
    const newLogConnection = await db.LogConnection.create({
      user_id: username,
      useragent: req.headers["user-agent"],
      ip: requestIP.getClientIp(req),
    });
    send2FAByMail(username, newLogConnection.id);
    return res.status(202).send();
  }

  if (
    logConnection.filter((log) => log.ip === requestIP.getClientIp(req))
      .length < 1
  ) {
    sendInformationMail(username, requestIP.getClientIp(req));

    if (remember === true) {
      await db.LogConnection.create({
        user_id: username,
        useragent: req.headers["user-agent"],
        ip: requestIP.getClientIp(req),
      });
    }
  }
  res.status(200).send({
    accessToken: req.session.token,
  });
};
