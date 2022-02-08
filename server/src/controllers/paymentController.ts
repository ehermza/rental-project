
import { Request, Response } from "express";

import Payment, { IPayment } from "../models/Payment";
import { IRental } from "../models/Rental";
import { getNextPeriodService } from "../services/debtService";
import { insertPaymentService } from "../services/paymentService";
import {
    getRentalByCtnerNumberService,
    getRentalByCtnerIdService
    } from "../services/rentalService";

// async function getPaymentByCtnerController(req: Request, res: Response) {
export async function insertPaymentByCtnerController(req: Request, res: Response) {

    try {
        const { ctner_id, amount, recibo_n } = req.body;

        const alquiler:IRental| null= await getRentalByCtnerIdService(ctner_id);
        if ( !alquiler ) {
            res.status(483).json({ message: 'Can\'t charge the payment entered', status: 483 });
            return;
        }
        //  const period: string = await getNextPeriodService(alquiler.last_payment_per);

        const period: string = "61f49146ac6c5cf15c191b1a";
        //  console.log(alquiler);
         console.log("============(NEXT PERIOD)==============");
         console.log(period);

         const pago:IPayment = new Payment({
             rental_id: alquiler._id,
             period_id: period,
             amount: amount,
             paid_at: new Date(),
             recibo_n: recibo_n
         });
         console.log(pago);
         const msg: string = (!insertPaymentService(pago))? "OK!": "ERROR";
         res.json({message: msg});
        //  const resPayment: IPayment= await pago.save();
        //  res.json(resPayment);

}
    catch (error) {
        res.status(480).json({ message: 'Can\'t charge the payment entered', status: 480 });
    }
}

