import Payment, { IPayment } from "../models/Payment";
import { IPeriod } from "../models/Period";
import { ObjectID } from "mongodb";
import { IRental } from "../models/Rental";
import { getNextPeriodService } from "./periodService";

export async function getPeriodtoInsert(alquiler: IRental): Promise<string> {
    try {
        const { _id, last_payment_per } = alquiler;
        const filter = {
            'rental_id': _id,
            'period_id': (last_payment_per)
        }
        const pago: IPayment | null = await Payment.findOne(filter);
        /**
         * Can't find the payment on database!  */
        if (!pago) {
            return "";
        }
        /**
         *  If current payment is incomplete, RENTAL.last-payment don't change... */
        if (!pago.complete) {
            return last_payment_per;
        }
        const objPeriod: IPeriod | null = await getNextPeriodService(last_payment_per);
        /**
         * Can't find the next period on database;  */
        if (!objPeriod) {
            return "";
        }

        return objPeriod._id;
    }
    catch (error) {
        throw new Error();
    }
}


export async function insertPaymentService(pago: IPayment): Promise<IPayment | -1> {
    try {
        return await pago.save();
        // const payment: IPayment= await pago.save();
        // console.log(payment);
        // return 0;

    }
    catch (error) {
        return -1;
    }
}

export async function updatePaymentService(filter:any, pago_update:IPayment) 
{
    try {
        console.log(pago_update);
        const payment: IPayment| null =
             await Payment.findOneAndUpdate(filter, pago_update);
        return payment;
    } 
    catch (error) {
        throw new Error();
    }
}