
import { Document, Schema, model } from "mongoose";

export interface IDebt extends Document
 {
    rental_id: String;
    period_id: String;    
    value: Number;
    completed: Boolean;    
}

const debtSchema = new Schema(
    {
        rental_id: String,
        period_id: String,    
        amount: Number,
        completed: Boolean,
    }
);
export default model('debt', debtSchema);
'*********************************************************************'
