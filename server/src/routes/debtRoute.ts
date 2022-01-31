
import { Router } from 'express'

import { insertDebtsController } from "../controllers/debtController"

class Debt {

    public router:Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.post('/', insertDebtsController);   //OK
    }
}
const debito:Debt = new Debt();

export default debito.router;