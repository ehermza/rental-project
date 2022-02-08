
import { Request, Response } from "express";

import Payment, { IPayment } from "../models/Payment";
import { IRental } from "../models/Rental";
import { getNextPeriodService } from "../services/debtService";
import {
    getRentalByCtnerNumberService,
    getRentalByCtnerIdService
    } from "../services/rentalService";

// async function getPaymentByCtnerController(req: Request, res: Response) {
async function insertPaymentByCtnerIdController(req: Request, res: Response) {

    try {
        const { ctner_id, amount, paid_at, recibo_n } = req.body;
/* 
        const rental: IRental = getRentalByCtnerService()
        const period: string = getNextPeriodService()

 */    }
    catch (error) {
        res.status(480).json({ message: 'Can\'t charge the payment entered', status: 480 });
    }
}