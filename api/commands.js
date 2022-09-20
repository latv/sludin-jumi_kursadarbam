const yargs = require("yargs");
const axios = require("axios");
const config = require("./app/config/auth.config");
require("dotenv").config();

const options = yargs
    .usage("Usage: -make_admin <name>")
    .option("n", { alias: "username", describe: "Your username to make you admin", type: "string", demandOption: true })
    .argv;



const db = require("./app/models");
// db.sequelize.sync();
const User = db.user;
console.log(User.findAll().then((result) => {
    console.log(result)
}));