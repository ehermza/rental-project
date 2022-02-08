import { ObjectID } from "mongodb";

import Rental, { IRental } from '../models/Rental';
import Container, { IContainer } from "../models/Container";
import Debt, { IDebt } from '../models/Debt';

/**
 * Date: Feb.07th,2022.-
 *  WORKS OK! SUCCESS.
 * @param CtnerNumber 
 * @returns 
 */
export async function getRentalByCtnerService(CtnerNumber: number) :
    Promise <IRental| null>
{
    try {
        const filter: any = {
            id_container: CtnerNumber
        }
        const ctner: IContainer| null = await Container.findOne(filter);
        if( !ctner ) {
            return null;
        }
        const idCtner: ObjectID = ctner._id;        

        const filtra: any = {
            id_container: idCtner,
            active: true
        }
        // const alquiler: IRental| null = await Rental.findOne(filtra);
        return await Rental.findOne(filtra);
    } 
    catch (error) {
        return null;
    }
}

//  Edit! SUCCESS Jan.28th,2022
export async function createAlquilerService(id_client: string, id_container: string, idDebt: string, fecha: number) {
    try {
        // const alquiler:IRental       
        const alquiler: IRental = new Rental(
            {
                id_client,
                id_container,
                // id_debtinfo: idDebt,
                active: true,
                date_init: fecha,
                deuda_total: 0,
                pagos_total: 0,
                last_payment_id: "",
                last_debt_id: ""
                // deuda_register: [],
                // pagos_register: [], 
            }
        );
        // const rental: IRental = alquiler;
        console.log("========(createAlquilerService)========")
        console.log(alquiler);
        return await alquiler.save();

    } catch (error) {
        throw new Error();

    }
}

export async function getlistAlquilerService(): Promise<IRental[] | null> // : Promise<string[] |null> 
{
    /** 
     * Date: Jan.30th,2022 | It's Working OK! 
     **/
    try {
        const filter = {
            active: true
        }
        const listRental: IRental[] = await Rental.find(filter);
        /*         
                const IDLIST: string[] = [];
                listRental.forEach(
                    listRental => {
                        IDLIST.push(listRental._id);
                    });
         */
        return listRental;

    }
    catch (error) {
        return null;
    }

}


// export async function findAndUpdateService(idRental: string, dbto: IDebt)
export async function findAndUpdateService(alquiler: IRental, update_per: string)
    : Promise<IRental | null> {
    try {
        /**
         * Created Date: Jan 01th,2022
         */
        const { _id, price_tocharge, deuda_total } = alquiler;
        const filter = {
            _id: new ObjectID(_id)
        }
        if (!price_tocharge)
            return null;

        const totaldebt: Number = deuda_total.valueOf() + price_tocharge.valueOf();
        const update = {
            'last_debt_per': update_per,
            'deuda_total': totaldebt
        };

        return await Rental.findOneAndUpdate(filter, update, {
            new: true
        });
    }
    catch (error) {
        throw new Error();
    }
}

async function getNextPeriodService(params: string) {
    try {

    } catch (error) {

    }
}
