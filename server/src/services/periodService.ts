import Period, { IPeriod } from "../models/Period";
import { ObjectId } from "mongodb";
import { IPayment } from "../models/Payment";

/* 
export async function getPeriodtoInsert(per: string): Promise<IPeriod | null>
 {
    try {
        const filter = {
            '_id': new ObjectId(per)            
        }
        const pago:IPayment=
        const objPeriod: IPeriod| null = await getNextPeriodService(per);

        return objPeriod;
    } catch (error) {
        return null;
    }
}
 */
export async function getLastPeriodService(): Promise<IPeriod | null>
{
    var STR_PERIOD: string = "61f49146ac6c5cf15c191b1a";
    // Value: Id period October-2021.-
    try {
        var objPeriod: IPeriod | null = new Period({});
        while (STR_PERIOD != "") 
        {
            const filter = {
                "_id": new ObjectId(STR_PERIOD)
            }
            objPeriod = await Period.findOne(filter);
            console.log("========(PERIOD FROM DATABASE)========")
            console.log(objPeriod);

            if (!objPeriod) {
                return null;
            }
            STR_PERIOD = objPeriod.month_next_id;
        }
        return objPeriod;

    } 
    catch (error) {
        return null;
    }
}

export async function getNextPeriodService(STR_PERIOD: string): Promise<IPeriod | null>
{
    try {
        var objPeriod: IPeriod | null = new Period({});

        let filter = {
            "_id": new ObjectId(STR_PERIOD)
        }
        objPeriod = await Period.findOne(filter);
        if (!objPeriod) {
            return null;
        }
        const nextPeriod:string = objPeriod.month_next_id;

        // return objPeriod;
        filter = {
            "_id": new ObjectId(nextPeriod)
        }
        return await Period.findOne(filter);

    } 
    catch (error) {
        return null;
    }
}