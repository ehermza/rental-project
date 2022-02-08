
import {Router} from "express";

import {} from "../controllers/paymentController";

class Payment 
{
    public router:Router;

    constructor(){
        this.router = Router();
        this.routes();
    }
   
    routes() {
        // this.router.get('/container/:idctner', )
    }
}
const pago: Payment = new Payment();

export default pago.router;