 
const rentalSchema = new Schema(
    {
        id_client: {type:String, required:true},
        id_container: {type:String, required:true},

        active: Boolean,
        date_init: {
            type:Date, default: Date.now, required: true
        },
        date_final: Date,
        deuda_total: Number,
        pagos_total: Number,
        last_payment_id: id-table-payment,
        last_debt_id: id-table-debt
   }
);
export default model<IRental>('rental', rentalSchema);
'*********************************************************************'


const debtSchema = new Schema(
    {
        rental_id: id-table-rental,
        period_id: Id-table-period,    
        value: Number,
        canceled: Boolean,
    }
);
export default model('debt', debtSchema);
'*********************************************************************'

const paymentSchema = new Schema(
    {
        rental_id: String,
        period_id: String,    
        value: Number,
        paid_at: Date,
        recibo_n: String,
        method_paid: String,
    }
);
export default model('payment', debtSchema);
'*********************************************************************'

const periodSchema = new Schema(
    {
    month_name: String,
    year_number: Number,
    month_next: String,
    month_prev: String,
})
export default model("period", periodSchema);
