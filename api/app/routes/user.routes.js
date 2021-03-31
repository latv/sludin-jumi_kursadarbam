const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

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
    "/api/test/register-wish",

    controller.registerWish
  );
  app.get(
    "/api/test/search",

    controller.searchWish
  );

  app.get(
    "/api/test/get-wishes",

    controller.getWishes
  );
  

  app.get(
    "/api/test/profile",
    [authJwt.verifyToken],
    controller.profile
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken],
    controller.moderatorBoard
  );


};
