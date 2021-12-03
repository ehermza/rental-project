export interface IDebt extends Document {
    number_ctner: number;
    // id_rental: string;
    name_client: string;
    current_debt: number;
    price_rental: number;
    overdue_debt: number;
    paid_current_per: string;
}

export class Debt
 {
    number_ctner: number = -1;
    // id_rental: string;
    name_client: string = "";
    current_debt: number = 0;
    price_rental: number = -1;
    overdue_debt: number = 0;
    paid_current_per: string = "not per.";

}