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
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const passport = require("passport");
const passportJWT = require("passport-jwt");
const { db } = require("./Server.js");
passport.use(new passportJWT.Strategy({
    secreatOrKey: process.env.SECRET,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db.one(`SELECT * FROM user WHERE id=$1`, payload.id);
    console.log(user);
    try {
        return user ? done(null, user) : done(new Error("User not found"));
    }
    catch (error) {
        done(error);
    }
})));
