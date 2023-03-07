/*
const authJwt = require("../middleware/authJwt.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test", [authJwt.verifyToken], (req, res) => {res.send("C'est bon")});
};
*/
