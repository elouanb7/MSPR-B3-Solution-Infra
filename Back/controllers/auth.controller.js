const config = require("../config/auth.config");
const bcrypt = require("bcryptjs");
const db = require("../models");
const requestIP = require("request-ip");
const { authenticator } = require("otplib");
const speakeasy = require("speakeasy");
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
  if (token !== req.session.token) {
    res.status(401).send({ error: "Invalid session token" });
    return;
  }

  req.session.destroy(() => {
    res.send({ message: "Logout successful" });
  });
};

/*exports.verifyOtp = async (req, res) => {
  // const ad = new ActiveDirectory(config);
  // ad.authenticate(username, password, function(err, auth) {
  //   if (err) {
  //     return res.status(401).send();
  //   }
  //   if (!auth) {
  //     return res.status(401).send();
  //   }
  // });

  const user = {
    password: bcrypt.hashSync('P@ssword', 8)
  }
  if (!user || !req.body.login || !req.body.otpCode) {
    return res.status(401).send();
  }
  const passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!passwordIsValid) {
    return res.status(401).send();
  }

  const userOtp = await db.User.findOne({where: { email: req.body.login}});
  const verifiedOtp = speakeasy.totp.verify({
    secret: userOtp.otp_base32,
    encoding: "base32",
    token: req.body.otpCode
  });
  if(!verifiedOtp){
    return res.status(401).send();
  }

  const logConnection = await db.LogConnection.findAll({
    where: {
      useragent: req.headers['user-agent'],
    }
  });

  if(logConnection.length < 1 || logConnection.filter(log => log.isVerified === true).length < 1) {
    const newLogConnection = await db.LogConnection.create({
      user_id: req.body.login,
      useragent: req.headers['user-agent'],
      ip: requestIP.getClientIp(req)
    });
    send2FAByMail(req.body.login, newLogConnection.id);
    return res.status(202).send();
  }


  if(logConnection.filter(log => log.ip === requestIP.getClientIp(req)).length < 1){
    sendInformationMail(req.body.login, requestIP.getClientIp(req));

    if(req.body.remember === true) {
      await db.LogConnection.create({
        user_id: req.body.login,
        useragent: req.headers['user-agent'],
        ip: requestIP.getClientIp(req)
      });
    }
  }

  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400
  });

  res.status(200).send({
    accessToken: token
  });

}*/
//
// exports.verifyByMail = async (req, res) => {
//   const logConnection = await db.LogConnection.findByPk(req.params.idLogConnection);
//
//   if(!logConnection) {
//     return res.status(404).send();
//   }
//   await logConnection.update({ isVerified: true })
//   res.send();
// }
