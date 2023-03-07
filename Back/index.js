const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const db = require("./models");
const useragent = require("express-useragent");
const PORT = process.env.PORT || 3000;
const rateLimit = require("express-rate-limit");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(useragent.express());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth", apiLimiter);

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// function initial() {
//   db.User.create({
//     email: "rgdmael@gmail.com",
//     otp_base32: "MFVTA33RJMSHIPTWMIXTUL26",
//   });
// }

require("./routes/auth.routes")(app);
// require("./routes/final.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
