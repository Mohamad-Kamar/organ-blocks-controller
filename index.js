require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const path = require("path");

const api = require("./routes/api");
const port = process.env.PORT || 3000;
const db = process.env.DB_STRING;

const app = express();

// mongoose.Promise = global.Promise;

mongoose.connect(db, (err) => {
  if (err) {
    console.error("Error! " + err);
  } else {
    console.log("Connected to mongodb");
  }
});

app.use(express.json());

app.use("/api", api);

app.listen(port, () => {
  console.log("Server running on localhost:" + port);
});
