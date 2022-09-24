var jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const config = require("../config/auth.config");
const db = require("../models");
const sharp = require("sharp");
const { adminUserID } = require("../models");
const { where } = require("sequelize");
const User = db.user;
const Poster = db.poster;
const Viewer = db.viewer;
const Admin = db.adminUserID;
let adminMode = [];
exports.getUserCredential = (req, res) => {
    // get user name and userID
    try {
        let token = req.headers["x-access-token"]; // use for browser
        token = jwt.decode(token, config.secret);
        User.findOne({ where: { id: token.id } }).then((result) => {
            let tokenUserName = result.name + " " + result.surname;
            res.status(200).send({ username: tokenUserName, id: token.id });
        });
    } catch (err) {
        console.log(err);
    }
};

exports.isAdmin = (req, res) => {
    let token = req.headers["x-access-token"]; // use for browser
    token = jwt.decode(token, config.secret);
    adminUserID.findOne({ where: { userId: token.id } }).then((result) => {
        if (result === null) {
            res.status(403).send("Forbiden!");
        } else {
            res.status(200).send("authorized!");
        }
    });
}
exports.putAdminMode = (req, res) => {
    let token = req.headers["x-access-token"]; // use for browser
    token = jwt.decode(token, config.secret);
    adminUserID.findOne({ where: { userId: token.id } }).then((result) => {
        if (result === null) {
            res.status(403).send("Forbiden!");
        } else {
            adminMode = adminMode.concat([token.id]);
            res.status(200).send("You are put on admin mode!");
        }
    });
}
exports.removeAdminMode = (req, res) => {
    console.log("Pirms adminmode: ", adminMode);
    let token = req.headers["x-access-token"]; // use for browser
    token = jwt.decode(token, config.secret);
    if (adminMode.includes(token.id)) {
        adminMode = adminMode.filter((item) => {
            return item !== token.id
        })
        res.status(200).send("Now you removed admin mode!");
    } else {
        res.status(400).send("You wasn't have admin mode on!");
    }
    console.log("Pēc adminmode: ", adminMode);
}

exports.registerPoster = (req, res) => {
    // register poster route with pictures
    console.log(req.file);

    let token = req.body["x-access-token"];
    token = jwt.decode(token, config.secret);

    if (req.file.path.includes(".jpg")) {
        sharp(req.file.path)
            .jpeg({ quality: 15 })
            .toFile(
                req.file.path.split("\\")[0] +
                "\\thumbnails\\" +
                req.file.path.split("\\")[1],
                (err, resizeImage) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(resizeImage);
                    }
                }
            );
    } else if (req.file.path.includes(".png")) {
        sharp(req.file.path)
            .png({ quality: 15 })
            .toFile(
                req.file.path.split("\\")[0] +
                "\\thumbnails\\" +
                req.file.path.split("\\")[1],
                (err, resizeImage) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(resizeImage);
                    }
                }
            );
    }
    User.findOne({ where: { id: token.id } }).then((result) => {
        Poster.create({
            user_id: token.id,
            poster: req.body.poster,
            price: req.body.price,
            image: req.file.path,
            phone_number: req.body.phone_number,
            userId: token.id,
            category: req.body.category,
            viewed: 0,
        });
        res.status(200).send("Registered poster");
    });
};

exports.editPoster = (req, res) => {
    // register poster route
    let token = req.body["x-access-token"];
    token = jwt.decode(token, config.secret);
    Poster.findOne({ where: { id: req.body.postId } }).then((el) => {
        if (el === null) {
            res.status(404).send("Not found this poster!"); // for didņt found poster
        } else if (el.userId == token.userId || adminMode.includes(token.id)) {
            if (req.file === undefined) { // if user don't wan't change  picture of poster
                Poster.update({

                    poster: req.body.poster,
                    price: req.body.price,
                    phone_number: req.body.phone_number,

                    category: req.body.category,
                }, { where: { id: req.body.postId } });
                res.status(200).send("Edited poster");
            } else { // if user want change poster image
                Poster.update({

                    poster: req.body.posterData,
                    price: req.body.price,

                    image: req.file.path,
                    phone_number: req.body.phone_number,

                    category: req.body.category,
                }, { where: { id: req.body.postId } });
                res.status(200).send("Edited poster");
            }


        } else { // if user doesn't have permisson to change poster

            res.status(403).send("You don't have right permission to accessS this!");
        }
    })

};

exports.deleteByID = (req, res) => {
    // delete poster by ID
    // validate if user is this poster creator or admin
    try {
        const ID_POSTER = req.params.id;
        Poster.destroy({ where: { id: ID_POSTER } });
        res.status(200).send({ message: "Succesful deleted poster" });
    } catch (err) {
        res.status(400).message(err);
    }
};

exports.getPostersByCategory = (req, res) => {
    // get posters by category name
    const ID_CATEGORY = req.params.category;
    Poster.findAll({ where: { category: ID_CATEGORY } }).then((result) => {
        if (result != null) {
            res.status(200).send(result);
        } else {
            res.status(401).send({ message: "Category is not found" });
        }
    });
};

exports.profile = (req, res) => {
    // get profile
    User.findOne({
        where: { id: jwt.decode(req.body["x-access-token"], config.secret).id },
    }).then((result) => {
        res.status(200).send({ username: result.name + " " + result.surname });
    });
};

exports.getPoster = (req, res) => {
    // get all posters
    Poster.findAll().then((result) => {
        res.status(200).send(result);
    });
};

function renameKey(obj, oldKey, newKey) {
    // rename keys to adjust to frontends needs
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}

exports.getAllCategories = (req, res) => {
    // get all categories name to display to category autoselect field
    db.sequelize
        .query("Select Distinct category from posters", {
            type: db.sequelize.QueryTypes.SELECT,
        })
        .then((result) => {
            result.forEach((obj) => renameKey(obj, "category", "value")); // rename keys to adjust to frontends needs

            res.status(200).send(result);
        });
};

exports.getMyPoster = (req, res) => {
    // get all my poster, which was published by his profile

    let token = req.headers["x-access-token"]; // use for browser
    token = jwt.decode(token, config.secret);
    Poster.findAll({
        where: { userId: token.id },
        validate: { isNull: true },
    }).then((result) => {
        if (result == null || result.length === 0) {
            res.status(404).send({ message: "My posters is not found" });
        } else {
            console.log(result);
            res.status(200).send(result);
        }
    });
};

exports.getMyHistory = (req, res) => {
    // get all poster,which I am viewed
    let token = req.headers["x-access-token"]; // use for browser
    token = jwt.decode(token, config.secret);
    db.sequelize
        .query(
            "SELECT t2.id, t2.poster, t2.price, t2.image ,MAX(t1.createdAt) FROM viewers t1 LEFT JOIN posters t2 ON t2.id =t1.posterId WHERE t1.userId=:idUser GROUP BY t1.createdAt DESC;", {
                replacements: { idUser: req.userId },
                type: db.sequelize.QueryTypes.SELECT,
            }
        )
        .then((historyData) => {
            res.status(200).send(JSON.stringify(historyData.filter((el) => el.id)));
        });
};

exports.getPosterByID = (req, res) => {
    // where you can get data from poster id in exact poster given by id
    try {
        const ID_POSTER = req.params.id;
        Poster.findOne({ where: { id: ID_POSTER } })
            .then((result) => {
                if (result === null) {
                    res.status(404).send({ message: "Not found" });
                } else {
                    res.status(200).send(result);

                    let token = req.headers["x-access-token"]; // use for browser

                    if (!token) {
                        Viewer.create({ posterId: ID_POSTER, userId: null });
                    } else {
                        Viewer.create({ posterId: ID_POSTER, userId: req.userId });
                    }

                    const countView = (id) =>
                        Viewer.count({
                            where: {
                                userId: id,
                                posterId: ID_POSTER,
                            },
                        });

                    countView(req.userId).then((e) => {
                        Poster.update({ viewed: e }, { where: { id: ID_POSTER } }).then(
                            (e) => console.log("sucess")
                        );
                    });
                }
            })
            .catch((err) => {
                res.status(404).send({ message: "Not found" });
            });
    } catch (err) {
        console.log(err);
    }
};