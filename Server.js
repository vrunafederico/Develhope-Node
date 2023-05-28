"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require('joi');
var express = require('express');
var app = express();
var _a = require("./controllers/planets.ts"), getAll = _a.getAll, getOneByID = _a.getOneByID, create = _a.create, updateByid = _a.updateByid, deleteByid = _a.deleteByid;
require('dotenv').config();
app.use(express.json());
app.get("/api/planets", getAll);
app.get("/api/planets/:id", getOneByID);
app.post("/api/planets", create);
app.put("/api/planets/:id", updateByid);
app.delete("/api/planets/:id", deleteByid);
app.listen(process.env.port, function () {
    console.log("Example app listening on port ".concat(process.env.port));
});
