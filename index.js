const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
var pg = require("pg");
const server = express(express.json(), cors(), helmet());

//test
server.get("/", (req, res) =>
  res.status(200).json({ message: "Welcome Wanderlust API" })
);

//routes
const usersRoute = require("./data/routes/usersRoute");
const tripsRoute = require("./data/routes/tripsRoute");

server.use("/api", usersRoute);
server.use("/api", tripsRoute);

//listening`
const port = 3300;

server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
