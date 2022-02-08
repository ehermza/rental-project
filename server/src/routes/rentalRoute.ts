
import { Router } from "express";

import {
    createAlquilerCtrl,
    getListAlquilerController,
    getRentalByCtnerController,
    // createPaymentCtrl,
    // getPaymentByCtnerCtrl,
    // getSaldoByCtnerCtrl, 
    // deletePaymentCtrl, 
    // getMonthNumberController, 
    // insertDebtController
} from "../controllers/rentalController";

class Rental {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {
        this.router.post('/', createAlquilerCtrl);  // It Works! Jan.2022.- OK
        this.router.get('/', getListAlquilerController);
        this.router.get('/container/:idctner', getRentalByCtnerController); //OK! Works.
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

const alquiler: Rental = new Rental();

export default alquiler.router;