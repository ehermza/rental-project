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
        this.router.post('/', rentalController_1.createAlquilerCtrl);
        this.router.get('/container/:idctner', rentalController_1.getRentalByCtnerController);
        this.router.post('/pagos/', rentalController_1.createPaymentCtrl); // insert new payment to database
        this.router.get('/pagos/:id', rentalController_1.getPaymentByCtnerCtrl); // get all payments of client by container active,
        this.router.get('/saldo/:id', rentalController_1.getSaldoByCtnerCtrl); // get difer. (pagos_total - deuda_total)
        this.router.delete('/pagos/:recibo&:idctner', rentalController_1.deletePaymentCtrl);
        this.router.get('/fecha/:idctner', rentalController_1.getMonthNumberController);
        // this.router.get('/insertdebt/:idctner', insertDebtController);      
        this.router.get('/insertdebt/', rentalController_1.insertDebtController);
        //  November 04th, 2021!
    }
}
const alquiler = new Rental();
exports.default = alquiler.router;
