import { Request, Response } from "express";
import { ObjectID } from "mongodb"

import {
    createAlquilerService,
    getlistAlquilerService,
    getRentalByCtnerIdService,
    getRentalByCtnerNumberService,
    // getRentalObjectServ,
    // insertPaymentService,
    // getPaymentByCtnerServ,
    // getSaldoByCtnerService,
    // deletePaymentByCtnerServ,
    // getMonthNumberService,
    // insertDebtService
} from "../services/rentalService";

import { 
    getContainersServ,
     getContainerOneServ 
} from "../services/containerService";
import { IRental } from "../models/Rental";


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
        const listRental:IRental[]| null = await getlistAlquilerService();
        res.json(listRental);
        
    } catch (error) {
        
    }
}

export async function getRentalByCtnerController(req: Request, res: Response)
 {
    try {
        const { n_ctner } = req.params;
        const rental: IRental| null = 
            await getRentalByCtnerNumberService(Number(n_ctner));

        if (!rental) {
            res.status(569).json({ status: 569, message: 'Rental object requested is not exists.' });
            return;
        }
        res.json(rental);

    } catch (error) {
        res.status(579).json({ status: 579, message: 'Error to try get Alquiler object.' });
    }
}

export async function getRentalByIdController(req: Request, res: Response)
 {
    try {
        const { id } = req.params;
        const rental: IRental| null = 
            await getRentalByCtnerIdService(id);

        if (!rental) {
            res.status(569).json({ status: 569, message: 'Rental object requested is not exists.' });
            return;
        }
        res.json(rental);

    } catch (error) {
        res.status(579).json({ status: 579, message: 'Error to try get Alquiler object.' });
    }
}
