import { IRental } from "../models/Rental";
import Debt, { IDebt } from "../models/Debt";
import { ObjectId } from "mongoose";

export async function insertDebtService(alquiler: IRental, amount: number)
// : Promise<IRental> 
{
 try {
    alquiler.last_debt_id = 
    await alquiler.updateOne({
    })
     
 } catch (error) {
     
 }
}