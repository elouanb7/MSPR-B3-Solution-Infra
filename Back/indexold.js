/*
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const ActiveDirectory = require("activedirectory2");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    name: "qid",
    secret: "superdupersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`Le serveur Express écoute sur le port 3000`);
});

const ad = new ActiveDirectory({
  url: "ldap://192.168.220.129", // Remplacez par l'URL de votre domaine Active Directory
  baseDN: "dc=resilience,dc=local", // Remplacez par le DN de votre domaine Active Directory
  username: "Administrateur@resilience.local", // Remplacez par un nom d'utilisateur avec les droits de lecture dans Active Directory
  password: "Resilience1234!", // Remplacez par le mot de passe correspondant
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  findUser(username, function (err) {
    if (err) {
      res.status(404).send(err);
    }
  });

  // const is2FA = isTwoFactor(username);
  // if (is2FA === true) {
  //   setupTwoFactor(username);
  // } else {
  //   setupTwoFactor(username);
  // }

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
});

app.get("/logout", (req, res) => {
  console.log(req.session);
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
});

app.get("/user/:username", function (req, res) {
  const username = req.params.username;
  findUser(username, function (err, user) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(user);
    }
  });
});

function findUser(username, callback) {
  ad.findUser(username, (err, user) => {
    if (err) {
      console.log("Erreur de recherche utilisateur : " + JSON.stringify(err));
      callback({ error: "Erreur de recherche utilisateur." });
    } else if (!user) {
      console.log("Utilisateur introuvable : " + username);
      callback({ error: "Utilisateur introuvable." });
    } else {
      console.log("Utilisateur trouvé : " + username);
      callback(null, user);
    }
  });
}

function isTwoFactor(username) {}
*/
