"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require('joi');
var express = require('express');
var app = express();
require('dotenv').config();
app.use(express.json());
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
app.get("/api/planets", function (req, res) {
    res.status(200).json(planets);
});
app.get("/api/planets/:id", function (req, res) {
    var element = planets.find(function (el) { return el.id === Number(req.params.id); });
    res.status(200).json(element);
});
app.post("/api/planets", function (req, res) {
    var schema = Joi.object().keys({
        id: Joi.number().integer().required(),
        name: Joi.string().required()
    });
    var data = schema.validate(req.body);
    if (data.error) {
        res.status(404).json({ msg: "error" });
        return;
    }
    planets.push(data.value);
    res.status(200).json({ msg: "Done" });
});
app.put("/api/planets/:id", function (req, res) {
    var schema = Joi.object().keys({
        name: Joi.string().required()
    });
    var data = schema.validate(req.body);
    if (data.error) {
        res.status(404).json({ msg: "error" });
    }
    var object = planets.find(function (el) { return el.id === Number(req.params.id); });
    if (object) {
        object.name = data.value.name;
        res.status(200).json({ msg: "Done" });
        return;
    }
    res.status(404).json({ msg: "Not found" });
});
app.delete("/api/planets/:id", function (req, res) {
    var index = planets.findIndex(function (el) { return el.id === Number(req.params.id); });
    if (index === -1) {
        res.status(404).json({ msg: "Not found" });
        return;
    }
    planets.splice(index, 1);
    res.status(200).json({ msg: "Done" });
});
app.listen(process.env.port, function () {
    console.log("Example app listening on port ".concat(process.env.port));
});
