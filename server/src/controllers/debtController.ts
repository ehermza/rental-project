import Debt, { IDebt } from "../models/Debt";

import {

} from "../services/debtService";

export async function createDebtController(req:Request, res:Response) {
    try {
        
        const debito:IDebt = new Debt({
         });
    
    } catch (error) {
        
    }
}