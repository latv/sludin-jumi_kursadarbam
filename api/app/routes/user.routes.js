const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        let fileDateName = new Date().toISOString().replace(/:/g, "-") + file.originalname;
        cb(null, fileDateName);

    },
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/test/register-poster",
        upload.single("image"),
        controller.registerPoster
    );
    app.post(
        "/api/test/edit-poster",
        upload.single("image"),
        controller.editPoster
    );

    app.get("/api/test/get-poster", controller.getPoster);
    app.post("/api/test/delete-poster/:id", controller.deleteByID);
    app.get("/api/test/is-admin", controller.isAdmin);
    app.get("/api/test/put-admin", controller.putAdminMode);
    app.get("/api/test/disable-admin", controller.removeAdminMode);
    app.get("/api/test/get-all-categories", controller.getAllCategories);
    app.get("/api/test/get-my-poster", controller.getMyPoster);

    app.get(
        "/api/test/get-my-history", [authJwt.verifyUser],
        controller.getMyHistory
    );

    app.get(
        "/api/test/get-poster/:id", [authJwt.verifyUser],
        controller.getPosterByID
    );

    app.get(
        "/api/test/category/:category",

        controller.getPostersByCategory
    );

    app.post(
        "/api/test/get-user-credential", [authJwt.verifyToken],
        controller.getUserCredential
    );
};