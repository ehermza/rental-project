
import { Request, Response } from "express";

import {
    getLastPeriodService,
    getNextPeriodService
} from "../services/periodService";
import { IPeriod } from "../models/Period"
import { IRental } from "../models/Rental";
import { ObjectId } from "mongodb";


export async function getLastPeriodController(req: Request, res: Response) {
    try {
        const objLastPeriod: IPeriod | null = await getLastPeriodService();

        res.json(objLastPeriod);

    } catch (error) {
        res.status(490).json({ status: 490, message: "Error to try the last period from database.-" });
    }
}

export async function getNextPeriodController(req: Request, res: Response) {
    try {
        const { period_id } = req.body;
        const objPeriod: IPeriod | null = await getNextPeriodService(period_id);

        res.json(objPeriod);

    } catch (error) {
        res.status(490).json({ status: 490, message: "Error to try the last period from database.-" });
    }
}

