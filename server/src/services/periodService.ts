import Period, { IPeriod } from "../models/Period";
import { ObjectId } from "mongodb";

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