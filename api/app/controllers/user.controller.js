var jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Poster = db.poster;
const Op = Sequelize.Op;

exports.allAccess = (req, res) => {
  // console.log("tokens, ",req.body.x-access-token)
  // console.log(jwt.decode(req.body.x-access-token, config.secret))
  try {
    let token = req.headers["x-access-token"];
    token = jwt.decode(token, config.secret);
    User.findOne({ where: { id: token.id } }).then(result => {
      let tokenUserName = result.username;
      console.log(result.username)
      // token= JSON.parse(token);

      console.log(tokenUserName);
      console.log("Token , ", token.id + '*');

      // token2  = JSON.stringify( token['id'] );
      res.status(200).send({ username: tokenUserName }
        // username: jwt.decode(req.body.x-access-token, config.secret)
      );
    });
  } catch (err) {

    console.log(err);


  }

};

exports.registerWish = (req, res) => {
  let token = req.headers["x-access-token"];
  console.log("token ,", token);
  token = jwt.decode(token, config.secret);
  console.log("token ,", token);
  User.findOne({ where: { id: token.id } }).then(result => {
    let tokenUserName = result.username;
    Wish.create({
      id_username: tokenUserName,
      poster: req.body.poster,
      price: req.body.price,
      image : req.body.image
    });
    res.status(200).send("Registered poster");

  });
};
exports.searchWish = (req, res) => {

  // console.log();
 
  let wishsearch = req.query.searchWish;
  console.log(wishsearch);

  Wish.findAll({ where: { wish: { [Op.substring]: wishsearch } } }

  ).then(result => {

    res.status(200).send(result);
  });

  // res.status(200).send("Registered wish");

};


exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};





exports.profile = (req, res) => {
  res.status(200).send({ username: jwt.decode(token, config.secret) });
};

exports.getWishes = (req, res) => {
  const wishes = Wish.findAll().then(result => {
    res.status(200).send(result.reverse());

  });
  // console.log(wishes);
  // res.status(200).send(wishes);
}