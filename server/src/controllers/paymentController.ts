
import { Request, Response } from "express";

import Payment, { IPayment } from "../models/Payment";

async function getPaymentByCtnerController(req: Request, res: Response) {
    try {
        const { rental_id, amount, paid_at, recibo_n } = req.body;


    }
    catch (error) {
        res.status(480).json({ message: 'Can\'t charge the payment entered', status: 480 });
    }
}