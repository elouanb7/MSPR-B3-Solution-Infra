const sgMail = require("@sendgrid/mail");
const SENDMAIL = require("../services/mail.service");

exports.send2FAByMail = (email, id) => {
  email = "resilienceclinique@gmail.com";
  const link = "*Future lien de connexion/*" + id;
  const msg = {
    to: email,
    from: "Clinique - Le Chatelet <resilienceclinique@gmail.com>",
    subject: "Vérifier la connexion à partir d'un nouveau navigateur",
    text:
      "Quelqu'un à tenté de se connecter à partir d'un autre navigateur\n" +
      link,
    //html: '<strong>and easy to do anywhere, even with e.js</strong>',
  };
  SENDMAIL(msg, (info) => {
    console.log("Email sent successfully");
    console.log("MESSAGE ID: ", info.messageId);
  });
};

exports.sendInformationMail = (email, ip) => {
  email = "resilienceclinique@gmail.com";
  const msg = {
    to: email,
    from: "Clinique - Le Chatelet <resilienceclinique@gmail.com>",
    subject: "Connexion depuis un nouvel endroit",
    text: "Quelqu'un à tenté de se connecter à partir d'une autre IP \n" + ip,
    //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  SENDMAIL(msg, (info) => {
    console.log("Email sent successfully");
    console.log("MESSAGE ID: ", info.messageId);
  });
};
