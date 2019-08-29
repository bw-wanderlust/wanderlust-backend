const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
var pg = require("pg");
const server = express();

server.use(
  express.json(), cors(), helmet()
)

const { sendContactEmail } = require("./utils/email");
//test
server.get("/", (req, res) =>
  res.status(200).json({ message: "Welcome Wanderlust API" })
);

// contact email

server.post("/api/contact", (req, res) => {
  const { firstName, lastName, email, phone, help } = req.body;
  console.log(body);
  sendContactEmail(firstName, lastName, email, phone, help);
});

//routes
const usersRoute = require("./data/routes/usersRoute");
const tripsRoute = require("./data/routes/tripsRoute");

server.use("/api", usersRoute);
server.use("/api", tripsRoute);

//listening`
const port = process.env.PORT || 3300;

server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
