const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const ActiveDirectory = require("activedirectory2");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
  })
);

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
      console.log("Authentification réussie pour l'utilisateur : " + username);
      findUser(username, (err, user) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(user);
        }
      });
    }
  });
});

app.get("/logout", (req, res) => {
  // Vérifier si l'utilisateur est connecté
  if (!req.session.authenticated) {
    res.status(401).send({ error: "Non authentifié." });
  } else {
    // Détruire la session
    req.session.destroy(() => {
      res.send({ message: "Déconnexion réussie." });
    });
  }
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
