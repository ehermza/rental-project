"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const debtController_1 = require("../controllers/debtController");
class DebtInfo {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get("/", debtController_1.getListDebts);
    }
}
const debtInfo = new DebtInfo();
exports.default = debtInfo.router;
