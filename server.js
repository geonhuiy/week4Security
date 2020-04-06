require("dotenv").config();

const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");

const sslkey = fs.readFileSync("../ssl-key.pem");
const sslcert = fs.readFileSync("../ssl-cert.pem");

const options = {
  key: sslkey,
  cert: sslcert,
};

const app = express();
app.get("/", async (req, res) => {
  if (req.secure) {
    console.log("visited url with https");
  } else {
    console.log("visited url with http");
  }
});
process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "production") {
  require("./production")(app, process.env.PORT);
} else {
  require("./localhost")(app, process.env.HTTPS_PORT, process.env.HTTP_PORT);
}
app.get("/", (req, res) => {
  res.send("Hello Secure World!");
});
