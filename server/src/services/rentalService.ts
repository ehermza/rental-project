
import Rental, { IRental } from '../models/Rental';
import { ObjectID } from "mongodb";


//  Edit! SUCCESS Jan.28th,2022
export async function createAlquilerService(idClient: string, idCtner: string, idDebt: string, fecha: number) {
    try {
        // const alquiler:IRental       
        const alquiler: IRental = new Rental(
            {
                id_client: idClient,
                id_container: idCtner,
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

