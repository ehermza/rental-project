import { model, Schema, Document } from "mongoose";

export interface IPayment extends Document {
    rental_id: string;
    period_id: string;
    amount: number;
    paid_at: Date;
    recibo_n: string;
    method_paid: string;
    complete:boolean;
    tocharge: number;
    // client_name: string;
}

const PaySchema = new Schema(
    {
        rental_id: { 
            type: String, 
            required: true 
        },
        period_id: { 
            type: String, 
            required: true
         },
        amount: { type: Number, required: true },
        paid_at: { type: Date, default: Date.now() },
        recibo_n: String,
        method_paid: String,
        complete: Boolean,
	    tocharge: String
    }
);

export default model<IPayment>('payment', PaySchema);
