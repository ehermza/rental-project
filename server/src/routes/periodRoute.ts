
import { Router } from "express";
import { getLastPeriodController } from "../controllers/periodController"

class Period {
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