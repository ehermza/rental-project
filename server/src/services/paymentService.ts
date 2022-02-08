import { IPayment } from "../models/Payment";


export async function insertPaymentService(pago:IPayment): Promise<Number>
 {
    try {
        const payment: IPayment= await pago.save();
        console.log(payment);
        return 0;

    } 
    catch (error) {
        return -1;
    }
}