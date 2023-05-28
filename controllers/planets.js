var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var pgPromise = require("pg-promise");
var Joi = require('joi');
var express = require('express');
var app = express();
var db = pgPromise()({
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'aS2MKXpy3k'
});
var createTable = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.none("\n    DROP TABLE IF EXISTS planets;\n\n    CREATE TABLE planets(\n      id SERIAL NOT NULL PRIMARY KEY,\n      name TEXT NOT NULL,\n      image Text\n    );\n    \n    INSERT INTO planets (name) VALUES ('Earth');\n    INSERT INTO planets (name) VALUES ('Mars');\n    ")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
createTable();
var getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.many("SELECT * FROM planets;")];
            case 1:
                planets = _a.sent();
                res.status(200).json(planets);
                return [2 /*return*/];
        }
    });
}); };
var getOneByID = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var element;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.one("SELECT * FROM planets WHERE id=$1;", [req.params.id])];
            case 1:
                element = _a.sent();
                if (!element) {
                    res.status(404).json("Not Found");
                    return [2 /*return*/];
                }
                res.status(200).json(element);
                return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var schema, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schema = Joi.object().keys({
                    name: Joi.string().required()
                });
                data = schema.validate(req.body);
                if (data.error) {
                    res.status(404).json({ msg: "error" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db.none("INSERT INTO planets (name) VALUES ($1);", [data.value.name])];
            case 1:
                _a.sent();
                res.status(200).json({ msg: "Done" });
                return [2 /*return*/];
        }
    });
}); };
var updateByid = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var schema, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schema = Joi.object().keys({
                    name: Joi.string().required()
                });
                data = schema.validate(req.body);
                if (data.error) {
                    res.status(404).json({ msg: "error" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db.none("UPDATE planets SET name=$2 WHERE id=$1;", [req.params.id, data.value.name])];
            case 1:
                _a.sent();
                res.status(200).json({ msg: "Done" });
                return [2 /*return*/];
        }
    });
}); };
var deleteByid = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.none("DELETE FROM planets WHERE id=$1;", [req.params.id])];
            case 1:
                _a.sent();
                res.status(200).json({ msg: "Done" });
                return [2 /*return*/];
        }
    });
}); };
var insertImage = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.none("UPDATE planets SET image=$2 WHERE id=$1;", [req.params.id, req.file.filename])];
            case 1:
                _a.sent();
                res.status(200).json({ msg: "Done" });
                return [2 /*return*/];
        }
    });
}); };
module.exports = {
    getAll: getAll,
    getOneByID: getOneByID,
    create: create,
    updateByid: updateByid,
    deleteByid: deleteByid,
    insertImage: insertImage
};
