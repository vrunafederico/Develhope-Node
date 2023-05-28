var Joi = require('joi');
var express = require('express');
var app = express();
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
var getAll = function (req, res) {
    res.status(200).json(planets);
};
var getOneByID = function (req, res) {
    var element = planets.find(function (el) { return el.id === Number(req.params.id); });
    if (!element) {
        res.status(404).json("Not found");
        return;
    }
    res.status(200).json(element);
};
var create = function (req, res) {
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
};
var updateByid = function (req, res) {
    var schema = Joi.object().keys({
        name: Joi.string().required()
    });
    var data = schema.validate(req.body);
    planets.map(function (el) {
        if (el.id === Number(req.params.id)) {
            el.name = data.value.name;
            res.status(200).json({ msg: "Done" });
        }
    });
};
var deleteByid = function (req, res) {
    planets = planets.filter(function (el) { return el.id !== Number(req.params.id); });
    res.status(200).json({ msg: "Done" });
};
module.exports = {
    getAll: getAll,
    getOneByID: getOneByID,
    create: create,
    updateByid: updateByid,
    deleteByid: deleteByid
};
