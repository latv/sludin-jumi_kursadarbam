const yargs = require("yargs");
const axios = require("axios");
const config = require("./app/config/auth.config");
require("dotenv").config();

// console.log(process.argv);
const argv = process.argv.slice(2);
console.log(argv);
if (argv[0] == "-userToAdminID") {
    if (argv[1] !== null) {

        const db = require("./app/models");


        const User = db.user;
        const adminUserID = db.adminUserID;

        User.findOne({ where: { id: argv[1] } }).then((result) => {
            if (result === null) {
                console.log("Nav atrasts lietotāja ID !");
            } else {
                adminUserID.findOne({ where: { userId: argv[1] } }).then((res) => {
                        if (res === null) {

                            adminUserID.create({ userId: argv[1] });
                            console.log("Ir piesķirta admina tiesības: ", argv[1], " lietotājam");
                        } else {
                            console.log("Tev ir jau piešķirtas admina tiesības !")
                        }
                    }

                )

            }

        });
    } else {
        console.log("Missing argument!")
    }

} else if (argv[0] == "-userToRemoveAdminID") {
    if (argv[1] !== null) {
        const db = require("./app/models");


        const User = db.user;
        const adminUserID = db.adminUserID;


        adminUserID.findOne({ where: { userId: argv[1] } }).then((result) => {
            if (result === null) {
                console.log("Nav atrasts lietotāja ID !");
            } else {
                adminUserID.destroy({ where: { userId: argv[1] } });
                console.log("Veiksmīgi izdzēsts lietotājs ar ID:", argv[1]);
            }
        });
    }

} else {
    console.log("Nav tādu komandu")

}


// if (!(options.userToDeleteId === true)) {
//     const db = require("./app/models");


//     const User = db.user;
//     const adminUserID = db.adminUserID;


//     adminUserID.findOne({ where: { userId: options.userToDeleteId } }).then((result) => {
//         if (result === null) {
//             console.log("Nav atrasts lietotāja ID !");
//         } else {
//             adminUserID.destroy({ where: { userId: options.userToAdminID } });
//             console.log("Veiksmīgi izdzēsts lietotājs ar ID:", options.optionsDelete);
//         }
//     });
// } else {
//     console.log("Missing argument!")
// }

// }


// const options = yargs
//     .usage("Usage: -userToAdminID <ID>")
//     .option({ alias: "userToDeleteId", describe: "Your user ID to delete as admin", type: "integer" })
//     .argv;

// const optionsDelete = yargs
//     .usage("Usage: -userToDeleteAdminID <ID>")
//     .option({ alias: "userToDeleteId", describe: "Your user ID to delete as admin", type: "integer" })
//     .argv;