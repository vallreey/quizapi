const config = require("../config/auth");
const db = require("../models");
const User = db.user;
const { Op } = require("sequelize");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const table = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    console.log(table);
    res.status(201).json({
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while signing up.",
    });
  }
};

const signin = async (req, res) => {
  try {
    const table = await User.findOne({
      where: {
        [Op.or]: [
          { username: req.body.username },
          { email: req.body.username },
        ],
      },
    });

    if (!table) {
      return res.status(404).json({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, table.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      {
        id: table.id,
        username: table.username,
        email: table.email,
      },
      config.secret,
      {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).json({
      id: table.id,
      username: table.username,
      email: table.email,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while signing in.",
    });
  }
};

module.exports = { signup, signin };
