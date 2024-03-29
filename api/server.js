const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

var corsOptions = {
    origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

const yargs = require("yargs");
const axios = require("axios");




// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");


db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.use("/uploads", express.static("./uploads"));

// set port, listen for requests
const PORT = process.env.PORT || 8080; //port for backend is 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});