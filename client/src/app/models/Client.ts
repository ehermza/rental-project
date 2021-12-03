
export interface Client {
    name: string;
    telephone?: string;
    DNI?: string;
    business?: string;
    active?: boolean;
    deuda_total: number;
    pagos_total: number;
    rent_info: [];
}

export class Client 
{
     _id: string;
     name: string = '';
     telephone?: string;
     DNI?: string;
     business?: string;
     active?: boolean;
     deudas_total: number = 0;
     pagos_total: number = 0;

    // constructor(idclient:string) { 
    constructor(isActive?: boolean) {
        this._id = '';
        this.active = isActive;
    }

    public setId(ID: string) {
        this._id = ID;
    }

    public setAtributtes(nameClient:string) {
        this.name = nameClient;
    }

    public setTotalPagos(importe: number) {
        this.pagos_total = importe;
    }
}
