import { Document, Schema, models, model } from "mongoose";
import { uuid } from "uuidv4";

export interface IClient extends Document {
    name: string;
    telephone: string;
    DNI: string;
    business: string;
    active: boolean;
    info_ad: string;

};

const ClientSchema = new Schema(
    {
        name: { type: String, required: true },
        telephone: String,
        DNI: String,
        business: String,
        active: { type: Boolean, default: true },
        info_ad: String,
    }
);

export default model<IClient>('client', ClientSchema);