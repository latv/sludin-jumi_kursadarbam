var jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Poster = db.poster;
const Op = Sequelize.Op;


exports.getUserCredential = (req, res) => { // get user name

  try {
    let token = req.headers["x-access-token"]; // use for browser
    console.log("token ,", token);
    token = jwt.decode(token, config.secret);
    console.log("token ,", token);
    User.findOne({ where: { id: token.id } }).then(result => {
      let tokenUserName = result.name + " " + result.surname;
      console.log(result.username)
      // token= JSON.parse(token);

      console.log(tokenUserName);
      console.log("Token , ", token.id + '*');

      // token2  = JSON.stringify( token['id'] );
      res.status(200).send({ username: tokenUserName, token : token.id }
        // username: jwt.decode(req.body.x-access-token, config.secret)
      );
    });
  } catch (err) {

    console.log(err);


  }

};

exports.registerPoster = (req, res) => { // register poster route
  console.log(req.file);
  let token = req.body["x-access-token"];
  console.log("token ,", token);
  token = jwt.decode(token, config.secret);
  console.log("token ,", token);
  User.findOne({ where: { id: token.id } }).then(result => {
    
    Poster.create({
      user_id: token.id,
      poster: req.body.poster,
      price: req.body.price,
      image : req.file.path,
      phone_number: req.body.phone_number,
      userId:token.id,
      category:req.body.category
    });
    res.status(200).send("Registered poster");

  });
};



exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};





exports.profile = (req, res) => {
  
  

    User.findOne({ where: { id: jwt.decode(req.body["x-access-token"], config.secret).id } }).then(result => {
    // let tokenUserName = result.username;
    res.status(200).send({ username: result.name + " " + result.surname} )
    
    
    });}


exports.getPoster = (req, res) => { // get all poster


  Poster.findAll().then(result => {
    res.status(200).send(result);

  });

  // console.log(wishes);
  // res.status(200).send(wishes);
};
exports.getPosterByID = (req, res) => { // where you can get data from poster id in exact poster given by id

  
    Poster.findOne({where :  {id : req.params.id}}).then(result => {
      res.status(200).send(result);
  
    });
  

  // console.log(wishes);
  // res.status(200).send(wishes);
};