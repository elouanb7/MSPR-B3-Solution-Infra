const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const useragent = require("express-useragent");
const PORT = process.env.PORT || 3000;
const rateLimit = require("express-rate-limit");
const session = require("express-session");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(useragent.express());
app.use(
  session({
    name: "sessionName",
    secret: "superdupersecret",
    resave: true,
    saveUninitialized: true,
  })
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth", apiLimiter);

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

function initial() {
  db.User.create({
    username: "cam.combale@resilience.local",
    otp_base32: "IVVVANR6IRMF2NZ7GFYVK5CMHFMCYND3",
  });
}

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
