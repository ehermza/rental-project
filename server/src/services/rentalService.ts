
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

export async function getListAlquilerService() {
    try {
        const filter = {
            active: true
        }
        const listAlquiler:Array<IRental> = await Rental.find(filter);
        const IDLIST: Array<string> = [];
        listAlquiler.forEach(listAlquiler => {
            IDLIST.push(listAlquiler._id);
        });
        console.log("===========(ACTIVE RENTALS)============")
        console.log(IDLIST);

        
    } catch (error) {
        
    }
    
}