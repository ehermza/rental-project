"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Routes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get("/", (req, res) => res.send("Containers Rent Typescript, Node js and MongoDB"));
    }
}
const routes = new Routes();
routes.routes();
exports.default = routes.router;
