var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pgPromise = require("pg-promise");
const Joi = require('joi');
const express = require('express');
const app = express();
const createTablePlanets = () => __awaiter(this, void 0, void 0, function* () {
    yield db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets(
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      image Text
    );
    
    INSERT INTO planets (name) VALUES ('Earth');
    INSERT INTO planets (name) VALUES ('Mars');
    `);
});
createTablePlanets();
const getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const planets = yield db.many(`SELECT * FROM planets;`);
    res.status(200).json(planets);
});
const getOneByID = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const element = yield db.one(`SELECT * FROM planets WHERE id=$1;`, [req.params.id]);
    if (!element) {
        res.status(404).json("Not Found");
        return;
    }
    res.status(200).json(element);
});
const create = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        name: Joi.string().required()
    });
    const data = schema.validate(req.body);
    if (data.error) {
        res.status(404).json({ msg: "error" });
        return;
    }
    yield db.none(`INSERT INTO planets (name) VALUES ($1);`, [data.value.name]);
    res.status(200).json({ msg: "Done" });
});
const updateByid = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        name: Joi.string().required()
    });
    const data = schema.validate(req.body);
    if (data.error) {
        res.status(404).json({ msg: "error" });
        return;
    }
    yield db.none(`UPDATE planets SET name=$2 WHERE id=$1;`, [req.params.id, data.value.name]);
    res.status(200).json({ msg: "Done" });
});
const deleteByid = (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield db.none(`DELETE FROM planets WHERE id=$1;`, [req.params.id]);
    res.status(200).json({ msg: "Done" });
});
const insertImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield db.none(`UPDATE planets SET image=$2 WHERE id=$1;`, [req.params.id, req.file.filename]);
    res.status(200).json({ msg: "Done" });
});
module.exports = {
    getAll,
    getOneByID,
    create,
    updateByid,
    deleteByid,
    insertImage
};
