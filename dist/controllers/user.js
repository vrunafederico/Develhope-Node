"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const JWT = require("jsonwebtoken");
require('dotenv').config();
const pgPromise = require("pg-promise");
const db = pgPromise()({
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'aS2MKXpy3k'
});
const createTable = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`
      DROP TABLE IF EXISTS users;

      CREATE TABLE users (
          id SERIAL NOT NULL PRIMARY KEY,
          username TEXT NOT NULL,
          password TEXT NOT NULL,
          token TEXT
      );`);
});
createTable();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object().keys({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    });
    try {
        const data = schema.validate(req.body);
        if (data.error) {
            res.status(400).json({ msg: "User not valide" });
            return;
        }
        const user = yield db.one(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`, [data.value.username, data.value.password]);
        res.status(200).json({ msg: "Signup successful. Now you can log in." });
    }
    catch (error) {
        res.status(400).json({ msg: "User not valide" });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object().keys({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    });
    try {
        const data = schema.validate(req.body);
        if (data.error) {
            res.status(400).json({ msg: "User not valide" });
            return;
        }
        const user = yield db.one(`SELECT * FROM users WHERE username=$1`, [data.value.username]);
        if (!user) {
            res.status(401).json({ msg: "User not found" });
            return;
        }
        if (data.value.password !== user.password) {
            res.status(402).json({ msg: "User not found" });
            return;
        }
        const payload = {
            id: user.id,
            username: user.username
        };
        const token = JWT.sign(payload, process.env.SECRET);
        const update = yield db.one(`UPDATE users SET token=$2 WHERE username=$1 RETURNING *`, [data.value.username, token]);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(400).json({ msg: "User not found" });
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const update = yield db.one(`UPDATE users SET token=$2 WHERE id=$1 RETURNING *`, [user.id, null]);
    res.status(200).json({ msg: "logout" });
});
module.exports = {
    db,
    signup,
    login,
    logout
};
