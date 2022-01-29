
import { Document, Schema, model } from "mongoose";

export interface IPeriod extends Document {
    month_name: string;
    year_number: Number;
    month_next_id: string;
    month_prev_id: string;
}

const periodSchema = new Schema(
    {
        month_name: { type: String, required: true },
        year_number: Number,
        month_next_id: String,
        month_prev_id: String,
    });
export default model<IPeriod>("period", periodSchema);
