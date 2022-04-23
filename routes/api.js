const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const db = process.env.DB_STRING;
const hashKey = process.env.HASH_KEY;
// mongoose.Promise = global.Promise;

mongoose.connect(db, (err) => {
  if (err) {
    console.error("Error! " + err);
  } else {
    console.log("Connected to mongodb");
  }
});

router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err);
    } else {
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, hashKey);
      res.status(200).send({ token });
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        res.status(401).send("Invalid Email");
      } else if (user.password !== userData.password) {
        res.status(401).send("Invalid Password");
      } else {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, hashKey);
        res.status(200).send({ token });
      }
    }
  });
});

module.exports = router;
