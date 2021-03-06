const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // user registration route
  try {
    // Save User to Database
    User.create({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      phone_number: req.body.phone_number,
    });
    res.send({ message: "user succesfuly registered" });
  } catch (ex) {
    var errorCode = 500;
    if (ex.type === "NotAuthorizedException") errorCode = 401;
    if (ex.type === "NotFoundException") errorCode = 404;
    res.status(errorCode).send({ message: ex.message });
  }
};

exports.refreshToken = async (req, res) => {
  // login route,where you can send token
  try {
    let token = req.headers["x-access-token"]; // use for browser
    token = jwt.decode(token, config.secret);
    let user = { id: token.id };
    res.status(200).send({
      accessToken: createToken(user),
    });
  } catch (ex) {
    var errorCode = 500;
    if (ex.type === "NotAuthorizedException") errorCode = 401;
    if (ex.type === "NotFoundException") errorCode = 404;
    res.status(errorCode).send({ message: ex.message });
  }
};

exports.signin = async (req, res) => {
  // login route,where you can send token
  try {
    const user = await authenticateRequestAsync(req);
    let { accessToken, expiresIn } = createToken(user);
    res.status(200).send({
      id: user.id,
      username: user.name + " " + user.surname,
      email: user.email,
      accessToken: accessToken,
      expiresIn: expiresIn,
    });
  } catch (ex) {
    var errorCode = 500;
    if (ex.type === "NotAuthorizedException") errorCode = 401;
    if (ex.type === "NotFoundException") errorCode = 404;
    res.status(errorCode).send({ message: ex.message });
  }
};

exports.logOut = async (req, res) => {
  // login route,where you can send token
  try {
    req.userId.deleteToken(req.userId, (err, user) => {
      if (err) return res.status(400).send(err);
      res.sendStatus(200);
    });
  } catch (ex) {
    var errorCode = 500;
    if (ex.type === "NotAuthorizedException") errorCode = 401;
    if (ex.type === "NotFoundException") errorCode = 404;
    res.status(errorCode).send({ message: ex.message });
  }
};

async function authenticateRequestAsync(req) {
  var user = await getUserByNameAsync(req.body.email);
  if (!user)
    throw {
      type: "NotFoundException",
      message: "User not found",
    };
  if (!authenticateUser(user, req.body.password))
    throw {
      type: "NotAuthorizedException",
      message: "Invalid Password!",
    };
  return user;
}

async function getUserByNameAsync(email) {
  return await User.findOne({
    where: {
      email: email,
    },
  });
}

function authenticateUser(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createToken(user) {
  let expiresIn = 86400; // 24 hours, here you can modify how long you want to be token expiration in s
  let accessToken = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: expiresIn,
  });
  return { accessToken, expiresIn };
}
