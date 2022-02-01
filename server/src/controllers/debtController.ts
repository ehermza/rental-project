import { Request, Response } from "express";
import { ObjectId } from "mongoose";

import Debt, { IDebt } from "../models/Debt";

import { 
    findAndUpdateService,
     getlistAlquilerService 
    } from "../services/rentalService";

import {
    insertDebtService,
    getNextPeriodService,
    } from "../services/debtService";
import Rental, { IRental } from "../models/Rental";


export async function insertDebtsController(req: Request, res: Response) {
    /** Date: Jan.30th.2022  SUCCESS. WORKING OK!
     *  Try to insert Debt to database from next period.-
     */
    try {
        const alquileres: IRental[] | null = await getlistAlquilerService();
        if (!alquileres) {
            res.status(466).json({ message: " There's not rental data on database.", status: 466 });
            return;
        }
        for (const alquiler of alquileres)
         {
             const {_id } = alquiler;
            const dbto: IDebt= await CreateDebtObject(alquiler);
            if(! dbto ) {
                continue;
            }
            const update: string = dbto.period_id.toString();
          const findandupdate =   await findAndUpdateService(_id, update);
        //   console.log(findandupdate);
        };
        res.json({ message: "Total Debts registered: " + alquileres.length });

    } catch (error) {
        res.status(460).json({
            message: "Error: There's Problem to try create New Debt!"
        })
    }
}
/* 
async function UpdateLastDebt(idRental:String, ptrDebt:String)
 {
    try {
        const filter = { '_id': idRental }
        const update = { 'last_debt_id': ptrDebt }
        await Rental.findByIdAndUpdate(idRental, update);
    } 
    catch (error) {
        
    }
}
 */
async function CreateDebtObject(alquiler: IRental): Promise<IDebt>
 {
    const { _id, price_tocharge, last_debt_per } = alquiler;

    let amount = (!price_tocharge) ? -1 : price_tocharge;

     let ptrPeriod: string = "61f49146ac6c5cf15c191b1a";
    if (last_debt_per) {
        ptrPeriod = await getNextPeriodService(last_debt_per);
        console.log("=============(GETNEXTPERIOD)=============");
        console.log(ptrPeriod);
    }
    /**
     * Creating the new Debt Collection on database;
     */
    const debt: IDebt = new Debt({
        rental_id: _id,
        period_id: ptrPeriod,
        amount: amount
    });
    return await insertDebtService(debt);
}
