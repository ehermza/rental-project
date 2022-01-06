import { Schema, model, Document } from 'mongoose'

export interface IGlobalDt extends Document {
    currentDebtPer: string;
    info: Number;
}

const globalDtSchema = new Schema({
    currentDebtPer: String,
    info: Number
});

export default model<IGlobalDt>('globaldt', globalDtSchema);
