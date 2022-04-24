const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const hashKey = process.env.HASH_KEY;

const register = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  let userData = {
    email: email,
    password: hash,
  };
  let user = new User(userData);
  try {
    const registeredUser = await user.save();

    let payload = { email, userId: registeredUser._id };
    let token = jwt.sign(payload, hashKey);
    res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let userData = req.body;
  try {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      res.status(401).send("Invalid Email");
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).send("Invalid Password");
      return;
    }

    let payload = { email, userId: user._id };
    let token = jwt.sign(payload, hashKey);
    res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  register,
  login,
};
