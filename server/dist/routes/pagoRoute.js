"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pagoController_1 = require("../controllers/pagoController");
class Pago {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        /**
         *  Functions Implemented in Rental model:
                this.router.post('/', createPaymentCtrl);
         **/
        this.router.get('/', pagoController_1.getPagosCtrl);
        this.router.get('/:idclient&:nctner', pagoController_1.getPagosByClientCtrl);
        // this.router.post('/', createPagoCtrl);
    }
}
const pago = new Pago();
exports.default = pago.router;
