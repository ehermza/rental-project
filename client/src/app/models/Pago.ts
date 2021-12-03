
export interface Pago 
{
    client: string ;
    value?: number;
    month_paid: string;
    paid_at: Date;
    paid_str: string;
    id_container: Number;
    recibo_n?: string;
    client_name?: string;
}
/**
 * class deprecated! urgent: delete it
 */
export class Pago 
{
    client: string = "";
    value?: number;
    month_paid: string = "";
    paid_at: Date = new Date();
    paid_str: string= '';
    id_container: Number= 0;
    recibo_n?: string;
    client_name?: string;

    constructor() {}

    setClientName(nombre:string) {
        this.client_name= nombre;
    }
    
    setCtnerNumber(ctnerNumber:Number){
        this.id_container = ctnerNumber;
    }

    getIdClient() {
        return this.client;
    }
}
