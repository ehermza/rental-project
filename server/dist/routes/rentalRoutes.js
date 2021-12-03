"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rentalController_1 = require("../controllers/rentalController");
class Rental {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        // this.router.post('/', createAlquilerCtrl);
        this.router.post('/', rentalController_1.print);
        this.router.post('/pago/', rentalController_1.createPaymentCtrl);
    }
}
const alquiler = new Rental();
exports.default = alquiler.router;
