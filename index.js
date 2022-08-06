/* eslint-disable require/first */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const { socketConnection } = require("./socket.js");
const http = require("http");
const Router = require('./src/routers');
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
app.use(Router);
const server = http.createServer(app);
const socketOptions = {
  cors: {
    origin: "*",
  },
};
server.listen(port, () => {
  console.log("Server Running at Port", port);
});

socketConnection(server, socketOptions);
