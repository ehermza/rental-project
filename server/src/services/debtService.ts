import { IRental } from "../models/Rental";
import Debt, { IDebt } from "../models/Debt";
import { ObjectID } from "mongodb";
import Period, { IPeriod } from "../models/Period";

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

 export async function getNextPeriodService(ptrCurrentPer:string): 
    Promise<string>
     {
        try {
            const objPer:IPeriod| null = await Period.findById(ptrCurrentPer);
            if(! objPer) {
                return "";
            }
            console.log("=============(CURRENT/PERIOD)=============");
            console.log(objPer);
    
            return objPer.month_next_id;
                
        } 
        catch (error) {
            throw new Error();            
        }
    
}

/* export async function getNextPeriodService(ptrDebtLast:string): 
    Promise<string> {
    try {
        // const obj:ObjectId
        const filter = {
            _id: new ObjectID(ptrDebtLast)
        }
        const lastdebt:IDebt = await Debt.findOne(filter);
        console.log(filter);
        
        // const lastdebt:IDebt = await Debt.findById(ptrDebtLast);
        if(! lastdebt) {
            return ""
        }
        console.log("=============(DEBT/LAST)=============");
        console.log(lastdebt);

        const ptrCurrentPer: String = lastdebt.period_id;
        const objPer:IPeriod| null = await Period.findById(ptrCurrentPer);
        if(! objPer) {
            return "";
        }
        return objPer.month_next_id;

    } catch (error) {
        return "";
    }
} */