
export interface IRental 
{
    id_client: string, 
    id_container: string,
    id_debtinfo: string,

    active: Boolean,
    date_init: Date,
    date_final: Date,

    deuda_total: number,
    deuda_register: [],

    pagos_total: number,
    pagos_register: [],

    last_payment: ProxPago
};

export interface ProxPago {
    period: String;
    a_cta : number;
}

export interface RgtDeuda {
    value: number;
    period: String;
}

export interface RgtPago {
    value: number;
    period: String;
    paid_at: Date;
    recibo_n: String;
}

/**
 * Class created by EHER Date: Sept.06th, 2021
 *  rent.containers-ng project. ver beta.
 */
export class Rental {
    id_client: String = '';
    id_container: String = '';

    active: Boolean = false;
    date_init: Date = new Date();
    date_final: Date = new Date();

    deuda_total: number = 0;
    deuda_register: Array<RgtDeuda> = [];

    pagos_total: number = 0;
    pagos_register: Array<RgtPago> = [];


    constructor(client: string, container: string) {
        this.id_client = client;
        this.id_container = container;
    }

    setInitRent(fecha: Date) {
        this.date_init = fecha;
        this.active = true;
    }

    setEndRent(fecha: Date) {
        this.date_final = fecha;
        this.active = false;
    }


    insertDeuda(importe: number, fecha: Date, per: String): number 
    {
        if(!this.active) return -1;

        const deuda: RgtDeuda = {
            value: importe,
            period: per,
        }
        this.deuda_register.push(deuda);
        this.deuda_total += importe;

        // return true;
        return (this.deuda_total - this.pagos_total);
    }

    insertPayment(importe: number, fecha: Date, per: String, recibo?:String): number
    {
        if(!this.active) return -1;

        const pago: RgtPago = {
            value: importe,
            period: per,
            paid_at: fecha,
            recibo_n: (recibo!= undefined)? recibo: "",
        }
        this.pagos_register.push(pago);
        this.pagos_total+= importe;

        // return true;
        return (this.deuda_total - this.pagos_total);
    }
    
}