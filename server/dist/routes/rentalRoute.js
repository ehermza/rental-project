"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rentalController_1 = require("../controllers/rentalController");
class Rental {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/', rentalController_1.createAlquilerCtrl); // It Works! Jan.28th,2022.- OK
        this.router.get('/', rentalController_1.getListAlquilerController);
        this.router.get('/container/:idctner', rentalController_1.getRentalByCtnerController);
        /*
                this.router.post('/pagos/', createPaymentCtrl);      // insert new payment to database
                this.router.get('/pagos/:id', getPaymentByCtnerCtrl);   // get all payments of client by container active,
                this.router.get('/saldo/:id', getSaldoByCtnerCtrl);     // get difer. (pagos_total - deuda_total)
                this.router.delete('/pagos/:recibo&:idctner', deletePaymentCtrl);
                
                this.router.get('/fecha/:idctner', getMonthNumberController);
                // this.router.get('/insertdebt/:idctner', insertDebtController);
                this.router.get('/insertdebt/', insertDebtController);
                    //  November 04th, 2021!
         */
    }
}
const alquiler = new Rental();
exports.default = alquiler.router;
