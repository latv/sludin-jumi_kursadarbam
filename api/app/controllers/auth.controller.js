const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => { // user registration route
  try{
  // Save User to Database
  User.create({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phone_number: req.body.phone_number
  });
  res.send({ message: "user succesfuly registered" });

}   catch(ex) {
  var errorCode = 500;
  if(ex.type === 'NotAuthorizedException') 
    errorCode = 401;
  if(ex.type === 'NotFoundException') 
    errorCode = 404;
  res.status(errorCode).send({ message: ex.message });
};
};
exports.signin = async (req, res) => { // login route,where you can send token
  try {
    const user = await authenticateRequestAsync(req);
    res.status(200).send({
      id: user.id,
      email: user.email,
      accessToken: createToken(user)
    });
  }
  catch(ex) {
    var errorCode = 500;
    if(ex.type === 'NotAuthorizedException') 
      errorCode = 401;
    if(ex.type === 'NotFoundException') 
      errorCode = 404;
    res.status(errorCode).send({ message: ex.message });
  };
};

async function authenticateRequestAsync(req) { 
  var user = await getUserByNameAsync(req.body.email);
  if(!user)
    throw {
      type: 'NotFoundException',
      message: 'User not found'
    };
  if(!authenticateUser(user, req.body.password)) 
    throw {
      type: 'NotAuthorizedException',
      message: 'Invalid Password!'
    };
  return user;
}

async function getUserByNameAsync(email) {
  return await User.findOne({
    where: {
      email: email
    }
  });
}

function authenticateUser(user, password) {
  return bcrypt.compareSync(
    password,
    user.password
  );
}

function createToken(user) {
  return jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // 24 hours, here you can modify how long you want to be token expiration in s
  });
};

async function getRolesAsync(user) { // here you know what is signed in admin or user 
  var roles = await user.getRoles();
  return roles.map(role => "ROLE_" + role.name.toUpperCase())
}