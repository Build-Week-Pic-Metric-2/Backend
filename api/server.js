require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const session = require("express-session");
const KnexSessionStorage = require("connect-session-knex")(session);

const sessionConfiguration = require("./sessionConfig").config(
  KnexSessionStorage
);

const authRouter = require("../auth/auth-router");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("dev"));
server.use(session(sessionConfiguration));

server.get("/", (req, res) => {
  res.json({
    message: "This server is very well breathing. Thanks for checking."
  });
});

server.use("/api/auth", authRouter);

module.exports = server;
