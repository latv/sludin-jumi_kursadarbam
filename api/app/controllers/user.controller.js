var jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Poster = db.poster;
const Viewer = db.viewer;
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


exports.registerComment = (req, res) => { // register comment route
  let token = req.headers["x-access-token"]; // use for browser
  console.log("token ,", token);
  token = jwt.decode(token, config.secret);
  console.log("token ,", token);
  console.log( "body ", req.body);
    
    Comments.create({
      user_id: token.id,
      post: req.body["comment_post"],
      poster_id: req.body["poster_id"]
    });
    res.status(200).send("Registered coment");


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


exports.getMyPoster = (req, res) => { // get all poster

  let token = req.headers["x-access-token"]; // use for browser
  console.log("token ,", token);
  token = jwt.decode(token, config.secret);
  console.log("token ,", token);
  Poster.findAll({ where: { user_id: token.id } }).then(result => {
    res.status(200).send(result);

  });

  // console.log(wishes);
  // res.status(200).send(wishes);
};


exports.getPosterByID = (req, res) => { // where you can get data from poster id in exact poster given by id
  try{

   
    const ID_POSTER = req.params.id;
    Poster.findOne({where :  {id : ID_POSTER}}).then(result => {
      res.status(200).send(result);
  
    });
    let token = req.headers["x-access-token"]; // use for browser
    
    if (!token){
      Viewer.create({	viewer_id: null ,post_id : ID_POSTER});
    } else{
      Viewer.create({	viewer_id: req.userId ,post_id : ID_POSTER});
    }
   

  // Viewer.create({	viewer_id: token.id ,post_id : ID_POSTER});

  
  

  }
  catch (err) {
    console.log(err);
  }
  // console.log(wishes);
  // res.status(200).send(wishes);
};