
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import Payment, { IPayment } from "../models/Payment";
import { IRental } from "../models/Rental";
// import { getNextPeriodService } from "../services/debtService";
import {
    insertPaymentService,
    getPeriodtoInsert,
    updatePaymentService
} from "../services/paymentService";
import {
    getRentalByCtnerNumberService,
    getRentalByCtnerIdService,
    updateRentalService
} from "../services/rentalService";

import { getNextPeriodService } from "../services/periodService";
import { IPeriod } from "../models/Period";


async function createPaymentCollect(ALQ_ID: string, PER_ID: string, totalCobr: number):
    Promise<IPayment | -1> {

    try {
        // const { _id, last_payment_per } = alquiler;
        const pago: IPayment = new Payment({
            rental_id: ALQ_ID,
            period_id: PER_ID,
            tocharge: totalCobr
        });
        console.log(pago);
        return await insertPaymentService(pago);
/*         
        const pagojson: IPayment | number = await insertPaymentService(pago);
        if (pagojson == -1) {
            res.status(433).json({ message: "Dont can\'t save payment to database.-" });
            return;
        }
    */
    }
    catch (error) {
        return -1;
    }
}


// async function getPaymentByCtnerController(req: Request, res: Response) {
export async function insertPaymentByCtnerController(req: Request, res: Response) {

    try {
        const { ctner_id, amount, recibo_n } = req.body;

        const alquiler: IRental | null = await getRentalByCtnerIdService(ctner_id);
        if (!alquiler) {
            res.status(483).json({ message: 'Can\'t charge the payment entered', status: 483 });
            return;
        }
        //  
        const period_id: string = await getPeriodtoInsert(alquiler);
        if(period_id == "") {
            res.status(487).json({ message: 'Can\'t find the correct period.', status: 487 });
            return;
            
        }
        console.log("============(PERIOD TO UPDATE)==============");
        console.log(period_id);

        const IDALQ = alquiler._id;
        if (period_id != alquiler.last_payment_per)
         {
            const pagojson: IPayment| -1 = await createPaymentCollect(IDALQ, period_id, 7500);
            // const pagojson: IPayment | number = await insertPaymentService(pago);
            if (pagojson == -1) {
                res.status(433).json({ message: "Dont can\'t save payment to database.-" });
                return;
            }

        };

        const filter: any = {
            rental_id: IDALQ,
            period_id: period_id
        }
        // const pay_update: IPayment = new Payment({
        const pay_update: any= {
            amount: amount,
            paid_at: new Date(),
            recibo_n: recibo_n,
            method_paid: 'efectivo',
        }
        const PAYMENT_OBJ: IPayment| null = await updatePaymentService(filter, pay_update);
        /** Update Rental properties: last_payment_per, pagos_total.-
         */
        alquiler.pagos_total += amount;
        alquiler.last_payment_per = period_id;

        await updateRentalService(IDALQ, alquiler);
        res.json(PAYMENT_OBJ);
    }
    catch (error) {
        res.status(480).json({ message: 'Can\'t charge the payment entered', status: 480 });
    }
}

