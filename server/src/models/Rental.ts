
import { Schema, Document, model } from "mongoose";

export interface IRental extends Document
{
    id_client: string;
    id_container: string;
    active: Boolean;
    date_init: Date;
    date_final: Date;
    deuda_total: Number;
    pagos_total: Number;
    last_payment_per: string;
    last_debt_per: string;
    price_tocharge: Number;
}
/**
 * Class created by EHER Jan.26th,2022
 *  Rental containers- Project js. 
 */

const rentalSchema = new Schema(
    {
        id_client: { type: String, required: true },
        id_container: { type: String, required: true },

        active: Boolean,
        date_init: {
            type: Date, default: Date.now, required: true
        },
        date_final: Date,
        deuda_total: Number,
        pagos_total: Number,
        last_payment_per: String,
        last_debt_per: String,
        price_tocharge: Number
    }
);
export default model<IRental>('rental', rentalSchema);
'*********************************************************************'
