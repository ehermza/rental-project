import { Schema, model, Document } from 'mongoose';
// import { uuid } from 'uuidv4';

export interface RgtDeuda {
    value: number;
    period: String;
}

export interface RgtPago {
    // _id: ObjectID;
    value: number;
    period: String;
    paid_at: Date;
    recibo_n: String;
}
export interface LastPayment {
    a_cta: number;
    period: string;
}

export interface IRegister extends Document {
    number_ctner: number;
    name_client: string;
    paid_current_per: string;
    deuda_register: RgtDeuda;
    pagos_register: RgtPago;
    last_payment: LastPayment;
    last_deuda_per: string;
}

const RegisterSchema = new Schema(
    {
        number_ctner: { type: Number, required: true },
        name_client: String,
        deuda_register: {
            value: Number,
            period: String
        },
        pagos_register: {
            value: Number,
            period: String,
            paid_at: Date,
            recibo_n: String
        },
        paid_current_per: { type: String, default: 'not per.' }
    }
);

export default model<IRegister>('register', RegisterSchema);