
export interface IGlobalDt extends Document {
    currentDebtPer: string;
    info: Number;
}

export class GlobalDt 
{
    currentDebtPer: string = "";
    info: number = -1;
}
