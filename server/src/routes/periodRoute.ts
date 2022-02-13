
import { Router } from "express";
import {
    getLastPeriodController,
    getNextPeriodController
} from "../controllers/periodController"

class Period {
    /**
     * Author: EHERMZA
     * Clase para detallar mes de alquiler de forma dinámica. 
     * Date: Jan.27th,2022.-
     */
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.get("/", getLastPeriodController);      //OK
        this.router.get("/next", getNextPeriodController);  //OK

    }
}
const period: Period = new Period();

export default period.router;