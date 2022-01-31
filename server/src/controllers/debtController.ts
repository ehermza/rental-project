import { Request, Response } from "express";

import Debt, { IDebt } from "../models/Debt";

import { getlistAlquilerService } from "../services/rentalService";
import {
    insertDebtService

} from "../services/debtService";
import { IRental } from "../models/Rental";


export async function insertDebtsController(req:Request, res:Response) 
{
    /** Date: Jan.30th.2022 
     *  Try to insert Debt to database from next period.-
     *  SUCCESS. WORKING OK!
     */
    try {
        const alquileres: IRental[]| null = await getlistAlquilerService();
        if( !alquileres ) {
            res.status(466).json({ message: " There's not rental data on database.", status: 466 });
            return;
        } 
        let texto = ""       
        for(const alquiler of alquileres) {
           texto+= await CreateDebtObject(alquiler);
        };
        res.json(texto);
        
    } catch (error) {
        res.status(460).json({
            message: "Error: There's Problem to try create New Debt!"
        })
    }
}

async function CreateDebtObject(alquiler:IRental) : Promise<IDebt>
{
    const {_id, price_tocharge } = alquiler;
    let amount = (!price_tocharge)? -1: price_tocharge;

    const debt:IDebt = new Debt({
        rental_id: _id,
        period_id: 'ID-CURRENT-MONTH',
        amount: amount
    });
    return await insertDebtService(debt);
}


