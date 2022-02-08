
import {Router} from "express";

import {
    insertPaymentByCtnerController
} from "../controllers/paymentController";

class Payment 
{
    public router:Router;

    constructor(){
        this.router = Router();
        this.routes();
    }
   
    routes() {
        // this.router.get('/container/:idctner', )
        this.router.post('/', insertPaymentByCtnerController)
    }
}
const pago: Payment = new Payment();

export default pago.router;