const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  }
  ,
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/test/all",[authJwt.verifyToken], controller.allAccess);

  app.post(
    "/api/test/register-poster",
    upload.single('image'),
    controller.registerPoster
  );
  // app.get(
  //   "/api/test/search",

  //   controller.searchWish
  // );

  app.get(
    "/api/test/get-poster",
    controller.getPoster
  );

  app.get(
    "/api/test/get-poster/:id",
    controller.getPosterByID
  );
  

  app.get(
    "/api/test/profile",
    
    controller.profile
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken],
    controller.moderatorBoard
  );


};
