import { Request, Response } from "express";
import { ObjectID } from "mongodb"

import {
    createAlquilerService,
    getlistAlquilerService,
    // getRentalObjectServ,
    // insertPaymentService,
    // getPaymentByCtnerServ,
    // getSaldoByCtnerService,
    // deletePaymentByCtnerServ,
    // getRentalByCtnerService,
    // getMonthNumberService,
    // insertDebtService
} from "../services/rentalService";

import { 
    getContainersServ,
     getContainerOneServ 
} from "../services/containerService";


//  Edit! SUCCESS Jan.28th,2022
export async function createAlquilerCtrl(req: Request, res: Response) {
    try {
        // const {idclient, idctner, fecha} = req.body;
        const { ptr_client, ptr_ctner, client_name, ctner_number } = req.body;
        console.log("=========(REQ.BODY)=========");
        console.log(req.body);

/*         
        const debtinfo: IDebt | undefined =
            await createDebtService(ctner_number, client_name);
        if (!debtinfo) {
            res.status(711);
            return;
        }
        const ptr_debt: string = debtinfo._id;
 */     
        const alquiler = await createAlquilerService(ptr_client, ptr_ctner, "0", Date.now());
        res.json(alquiler);

    } catch (error) {
        res.status(730).json({ status: 730, message: 'Error to try create Alquiler object!' });
    }
}

export async function getListAlquilerController(req:Request, res:Response) 
{
    try {
    } catch (error) {
        
    }
}