// import Container, { IContainer } from '../models/Container';

import { ObjectID } from 'mongodb';
import { getRentalByCtnerService } from "../services/rentalService";
import Debt, { IDebt } from '../models/Debt';
import Rental, { IRental } from '../models/Rental';

let objRental: IRental | undefined = undefined;

export async function createDebtService(nCtner: number, client: string) {
    /**
     * This function execute just when create a new rental.
     * Date: Nov-20th.2021
     */
    const rental: string = "";   // var arg.
    const period: string = "";   // var arg.
    const amount: number = 0;    // var arg.

    try {
        const debtinfo: IDebt = new Debt({
            rental_id: rental,
            period_id: period,
            amount: amount,
            completed: false
        });
        console.log("=============(NEW DEBT)=============");
        console.log(debtinfo);

        return await debtinfo.save();

    } catch (error) {
        throw new Error();
    }
}

// to correct! Jan,27th-2022
async function getValueDebt(alquiler: IRental): Promise<Number>
{
    const ptrDebtLast: string = alquiler.last_debt_id;

    const amount: Number = await Debt.findById(new ObjectID(ptrDebtLast));
    return amount;
    /*     var importe: number = -1;
            if (!objRental)
                return -1;
        
            const per = objRental.last_deuda_per;
            const arDeudas: RgtDeuda[] = objRental.deuda_register;
            arDeudas.forEach(deuda => {
                if (deuda.period == per) {
                    importe = deuda.value;
                }
            });
            return importe;
         */
    return 0;
}

export async function updateDebtByPaymentService(id_debt: string, importe: number):
    Promise<IDebt | null> {
    try {
        const objDebt: IDebt | null = await Debt.findById(id_debt);
        if (!objDebt) {
            return null;
        }
        objDebt.current_debt -= importe;
        objDebt.overdue_debt -= importe;
        console.log("==========(DEBT BEFORE PAYMENT)=========");
        console.log(importe);
        console.log(objDebt);

        return await objDebt.save();

    } catch (error) {
        return null;
    }
}

export async function updateDebtService(alquiler: IRental) {
    try {
        objRental = alquiler;

        // const debtinfo: IDebt = Debt.findById(new ObjectID(id));
        const currentDebt: number =
            +objRental.deuda_total - objRental.pagos_total - objRental.last_payment.a_cta;
        // +objRental.deuda_total - objRental.pagos_total;

        const priceByMonth: number = getValueDebt(objRental);
        const difer: number = (currentDebt - priceByMonth);
        const atras: number = (difer > 0) ? difer : 0;

        const debt: any = {
            current_debt: currentDebt,
            // current_debt: -1,
            price_rental: priceByMonth,
            overdue_debt: atras,
            paid_current_per: '0'
        }
        const id: ObjectID = new ObjectID(objRental.id_debtinfo.toString());
        console.log("===========(DEBT-INFO)===========");
        console.log(debt);

        return await Debt.findByIdAndUpdate(id, debt);

    } catch (error) {
        throw new Error();
    }
}

export async function getDebtInfoService(): Promise<IDebt[]> {
    try {
        const aDebtInfo: IDebt[] = await Debt.find();
        console.log("===========(DEBT-TABLE-FIND)===========");
        console.log(aDebtInfo);

        return await aDebtInfo;

    } catch (error) {
        throw new Error();
    }
}