const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    },
});
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);

db.poster = require("../models/poster.model")(sequelize, Sequelize);

db.viewer = require("../models/viewer.model")(sequelize, Sequelize);

db.adminUserID = require("../models/adminUserID.model")(sequelize, Sequelize);

db.user.hasOne(db.poster);
db.user.hasOne(db.adminUserID);
db.poster.hasMany(db.viewer);
db.user.hasMany(db.viewer);

module.exports = db;