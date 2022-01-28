import { model, Schema, Document } from "mongoose";

export interface IPayment extends Document {
    client: string;
    value: number;
    id_container: number;
    month_paid: string;
    paid_at: Date;
    recibo_n: string;
    client_name: string;
}

const PaySchema = new Schema(
    {
        client: { type: String, required: true },
        value: { type: Number, required: true },
        id_container: { type: Number, required: true },
        month_paid: String,
        paid_at: { type: Date, default: Date.now() },
        recibo_n: String,
	    client_name: String
    }
);

export default model<IPayment>('payment', PaySchema);
