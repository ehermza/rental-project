
import Rental, { IRental } from '../models/Rental';
import { ObjectID } from "mongodb";


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

export async function getlistRentalService(): Promise<string[] |null> {
    /** 
     * Date: Jan.30th,2022
     **/
    try {
        const filter = {
            active: true
        }
        const listRental: Array<IRental> = await Rental.find(filter);
        const IDLIST: string[] = [];
        listRental.forEach(
            listRental => {
                IDLIST.push(listRental._id);
            });
        return IDLIST;

    }
    catch (error) {
        return null;
    }

}