
import { Request, Response } from "express";

import { getLastPeriodService } from "../services/periodService";
import { IPeriod } from "../models/Period"

export async function getLastPeriodController(req: Request, res: Response) {
    try {
        const objLastPeriod: IPeriod| null = await getLastPeriodService();

        res.json(objLastPeriod);

    } catch (error) {
        res.status(490).json({status:490, message: "Error to try the last period from database.-"});
    }
}