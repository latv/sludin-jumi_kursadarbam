const yargs = require("yargs");
const axios = require("axios");
const config = require("./app/config/auth.config");
require("dotenv").config();

const options = yargs
    .usage("Usage: -userToAdminID <name>")

.option({ alias: "userToDeleteId", describe: "Your user ID to delete as admin", type: "integer" })
    .argv;
const optionsDelete = yargs
    .usage("Usage: -userToDeleteAdminID <name>")
    .option({ alias: "userToDeleteId", describe: "Your user ID to delete as admin", type: "integer" })
    .argv;

const db = require("./app/models");


const User = db.user;
const adminUserID = db.adminUserID;

if (!(optionsDelete.userToDeleteId === true)) {
    User.findOne({ where: { id: optionsDelete.userToDeleteId } }).then((result) => {
        if (result === null) {
            console.log("Nav atrasts lietotāja ID !");
        } else {
            adminUserID.findOne({ where: { userId: optionsDelete.userToDeleteId } }).then((res) => {
                    if (res === null) {

                        adminUserID.create({ userId: optionsDelete.userToDeleteId });
                        console.log("Ir piesķirta admina tiesības: ", optionsDelete.userToDeleteId, " lietotājam");
                    } else {
                        console.log("Tev ir jau piešķirtas admina tiesības !")
                    }
                }

            )

        }

    });
}

if (!(options.userToDeleteId === true)) {

    adminUserID.findOne({ where: { userId: options.userToDeleteId } }).then((result) => {
        if (result === null) {
            console.log("Nav atrasts lietotāja ID !");
        } else {
            adminUserID.destroy({ where: { userId: options.userToAdminID } });
            console.log("Veiksmīgi izdzēsts lietotājs ar ID:", options.optionsDelete);
        }
    });
}