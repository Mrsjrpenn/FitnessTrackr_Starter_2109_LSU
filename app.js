require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const {PORT = 4000} = process.env;

// Setup your Middleware and API Router here

app.use(express.static(path.join(__dirname, 'Front_End', 'build')));
app.get('*', (req, res, next) => res.sendFile(path.join(__dirname, 'Front_End', 'build', 'index.html')));

module.exports = app;
