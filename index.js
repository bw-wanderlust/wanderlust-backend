const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express(express.json(), cors(), helmet());

//test
server.get("/", (req, res) =>
  res.status(200).json({ message: "Welcome Wanderlust API" })
);

//routes

//listening
const port = 3300;

server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
