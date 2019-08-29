require("dotenv").config;
const sendgrid = require("sendgrid").email;
const sg = require("sendgrid")(process.env.SENDGRID_KEY);

module.exports = {
  sendContactEmail: (firstName, lastName, email, phone, help) => {
    console.log("guest email fired");
    const request = sg.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: {
        personalizations: [
          {
            to: [
              {
                email: to
              }
            ],
            subject: "Contact"
          }
        ],
        from: {
          email: email
        },
        content: [
          {
            type: "text/plain",
            value: `from ${firstName || "name"} ${lastName ||
              "name"} this message : ${help || "message"}`
          }
        ]
      }
    });
    return new Promise(function(resolve, reject) {
      sg.API(request, function(error, response) {
        if (error) {
          console.log("sendgird err", error);
          return reject(error);
        } else {
          console.log("sendgird res", response.body.errors);
          return resolve(response);
        }
      });
    });
  }
};
