const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const config = require('../config/config');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      username,
      password: hashPassword,
    });

    const userData = { id: newUser.id, name: newUser.name };

    // Create and assign token
    const token = jwt.sign(userData, config.TOKEN_SECRET);
    res.header('Authorization', token);

    res.status(201).json({
      ...userData,
      token
    });
  } catch (err) {
    console.error(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) return res.status(400).send('Username or Password is wrong');

      const userData = { id: user.id, name: user.name };

      // Create and assign token
      const token = jwt.sign(userData, config.TOKEN_SECRET);
      res.header('Authorization', token);

      res.status(200).json({
        ...userData,
        token
      });
    }
  } catch (err) {
    console.error(err.message);
  }
};

const logout = (req, res) => {
  const authHeader = req.headers["authorization"];
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send({ msg: 'You have been Logged Out' });
    } else {
      res.send({ msg: `Error: ${err}` });
    }
  });
}

module.exports = {
  register,
  login,
  logout,
};
