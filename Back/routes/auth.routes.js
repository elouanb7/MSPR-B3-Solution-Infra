const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/login", controller.verifyCredentials);

  app.post("/api/auth/logout", controller.logout);

  /*  app.post("/api/auth/otp", controller.verifyOtp);*/

  // app.get("/api/auth/verify-auth/:idLogConnection", controller.verifyByMail);

  // app.get('/test', controller.generateOtp)
};
