require("dotenv").config();

const axios = require("axios");
axios.defaults.withCredentials = true;

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const session = require("express-session");
const KnexSessionStorage = require("connect-session-knex")(session);

const sessionConfiguration = require("./sessionConfig").config(
  KnexSessionStorage
);
const corsOptions = {
  origin: ["http://localhost:3000", "*"],
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
  optionsSuccessStatus: 200
};
const authRouter = require("../auth/auth-router");
const photosRouter = require("../photos/photosRouter");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors(corsOptions));
server.use(morgan("dev"));
server.use(session(sessionConfiguration));

server.get("/", (req, res) => {
  res.json({
    message: "This server is very well breathing. Thanks for checking."
  });
});

server.use("/api/auth", authRouter);
server.use("/api/photos", photosRouter);

server.use("/", express.static("view"));

module.exports = server;
