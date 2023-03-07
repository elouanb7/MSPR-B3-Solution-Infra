const ActiveDirectory = require("activedirectory2");
const config = require("../config/ad.config");

exports.findUser = async (req, res) => {
  const username = req.params.username;
  findUser(username, function (err, user) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(user);
    }
  });
};

function findUser(username, callback) {
  const ad = new ActiveDirectory(config);
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
