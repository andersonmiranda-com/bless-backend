const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../indexRoute");
const config = require("./config");

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

module.exports = app;
