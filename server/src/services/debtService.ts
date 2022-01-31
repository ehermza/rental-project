import { IRental } from "../models/Rental";
import Debt, { IDebt } from "../models/Debt";
import { ObjectId } from "mongoose";
import { IPeriod } from "../models/Period";

export async function insertDebtService(debito: IDebt): Promise<IDebt>
// : Promise<IDebt> 
{
    /** Date: Jan.30th.2022 
     *  Try to insert Debt to database from next period.-
     *  SUCCESS. WORKING OK!
     */

    try {
        return await debito.save();

    } 
    catch (error) {
        throw new Error();
    }
}
