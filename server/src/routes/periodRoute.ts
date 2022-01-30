
import { Router } from "express";
import { getLastPeriodController } from "../controllers/periodController"

class Period 
{
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
        this.router.get("/", getLastPeriodController);

    }
}
const period: Period = new Period();

export default period.router;