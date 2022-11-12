const yargs = require("yargs");
const axios = require("axios");
const { util, seed } = require('data-seed');
const config = require("./app/config/auth.config");
var bcrypt = require("bcryptjs");
require("dotenv").config();

// specific seed or util
const {
    util: {
        random
    },
    seed: {
        ip4
    }
} = require('data-seed');


// console.log(process.argv);
const argv = process.argv.slice(2);
const argv2 = process.argv.slice(3);
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
} else if (argv[0] == "-posterSeed") {
    if (argv[1] == null) {
        const db = require("./app/models");

        const Poster = db.poster;
        const poster = "mašīna";
        const userId = 1;
        price = Math.floor(Math.random() * (10000 - 10) + 10);
        const email = seed.email();
        const phone_number = "281663243";

        Poster.create({

            poster: poster,
            category: "Dārza tehnika",
            viewed: 0,
            price: price,
            userId: userId,
            image: 'uploads\\2022-11-12T16-09-52.904ZEkrānuzņēmums_20221025_200443.png',
            password: bcrypt.hashSync("1234567890", 8),
            phone_number: phone_number,
        });
        console.log("Created user");
    }
} else if (argv[0] == "-userSeed") {
    if (argv[1] == null) {
        const db = require("./app/models");


        const User = db.user;
        const name = seed.name.en.firstName();
        const surname = seed.name.en.lastName();
        const email = seed.email();
        const phone_number = "281663243";
        const password = "1234567890";
        User.create({
            name: name,
            surname: surname,
            email: email,
            password: bcrypt.hashSync("1234567890", 8),
            phone_number: phone_number,
        });
        console.log("Created user");
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
} else if (argv[0] == "-userSeed") {
    if (argv[1] == null) {
        const db = require("./app/models");


        const User = db.user;
        const name = seed.name.en.firstName();
        const surname = seed.name.en.lastName();
        const email = seed.email();
        const phone_number = "281663243";
        const password = "1234567890";
        User.create({
            name: name,
            surname: surname,
            email: email,
            password: bcrypt.hashSync(password, 8),
            phone_number: phone_number,
        });
        console.log("Created user");

    } else {
        const db = require("./app/models");



        for (let index = 0; index < argv[1]; index++) {
            var User = db.user;
            var name = seed.name.en.firstName();
            var surname = seed.name.en.lastName();
            var email = seed.email();
            var phone_number = "281663243";
            var password = "1234567890";
            User.create({
                name: name,
                surname: surname,
                email: email,
                password: bcrypt.hashSync(password, 8),
                phone_number: phone_number,
            });
            console.log(index, ". Created user");

        }

    }

} else if (argv[0] == "-isUserAdmin") {
    if (argv[1] !== null) {
        const db = require("./app/models");


        const User = db.user;
        const adminUserID = db.adminUserID;


        adminUserID.findOne({ where: { userId: argv[1] } }).then((result) => {
            if (result === null) {
                console.log("Nav tāds lietotājs adminis !");
            } else {

                console.log("Ir adminis ar tādu id:", argv[1], " un tam e-pasts : ", result.username);
            }
        });
    }

} else {
    console.log("Nav tādu komandu")

}
// process.exit(0);

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
//