var express = require('express');
var app = express();
require('dotenv').config();
app.use(express.json());
app.use(function (req, res, next) {
    console.log(req);
    next();
});
var planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
app.listen(process.env.port, function () {
    console.log("Example app listening on port ".concat(process.env.port));
});
