const yargs = require("yargs");
const axios = require("axios");
const config = require("./app/config/auth.config");
require("dotenv").config();

const options = yargs
    .usage("Usage: -user_ID <name>")
    .option("n", { alias: "userID", describe: "Your user ID to make you admin", type: "integer", demandOption: true })
    .argv;



const db = require("./app/models");
const { user } = require("./app/models");
// db.sequelize.sync();
const User = db.user;
const adminUserID = db.adminUserID;
User.findOne({ where: { id: options.userID } }).then((result) => {
    if (result === null) {
        console.log("Nav atrasts lietotāja ID !");
    } else {
        adminUserID.findOne({ where: { userId: options.userID } }).then((res) => {
                if (res === null) {

                    adminUserID.create({ userId: options.userID });
                    console.log("Ir piesķirta admina tiesības: ", options.userID, " lietotājam");
                } else {
                    console.log("Tev ir jau piešķirtas admina tiesības !")
                }
            }

        )

    }

});