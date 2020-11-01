const filePath = require("path").join(__dirname, "./");
const fs = require("fs");
const routePrefix = "/api";

module.exports = (app) => {

    app.get(routePrefix, (req, res, next) => {
        return res.status(200).send(`REST API Server`);
    });

    // require('./user-route')(app, routePrefix); import individual file

    fs.readdirSync(filePath).forEach((file) => {
        if (file.toString() !== "index.js"){
            require("./" + file)(app, routePrefix);
        }
    });
}