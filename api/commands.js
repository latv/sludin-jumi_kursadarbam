const yargs = require("yargs");
const axios = require("axios");

const options = yargs
    .usage("Usage: -make_admin <name>")
    .option("n", { alias: "username", describe: "Your username to make you admin", type: "string", demandOption: true })
    .argv;
const greeting = `Hello, ${options.username}!`;

console.log(greeting);