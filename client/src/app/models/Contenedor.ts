
export class Contenedor 
{
    _id?: string ;
    id_container: Number = -1;
    price_tocharge: Number = 0;
    rented_by: string ;
    rented_by_id: string;
    description?: string;
    active?: boolean = false;

    constructor(isActive:boolean) { 
        this.active = isActive;
        this.rented_by = '';
        this.rented_by_id= '-1';
    }

    public setAtributtes(numberCtdor: Number, value: Number, client:string) {
        this.id_container= numberCtdor;
        this.price_tocharge= value;
        this.rented_by = client;
    }

    public setId(idDatabase:string) {
        this._id = idDatabase;
    }
    
    public Unlinked() {
        this.rented_by = '';
        this.rented_by_id= '0';
        this.active = false;
    }
}
