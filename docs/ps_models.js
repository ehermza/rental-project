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
        last_payment_per: String,
        last_debt_per: String
   }
);
export default model<IRental>('rental', rentalSchema);
'*********************************************************************'

const debtSchema = new Schema(
    {
        rental_id: String,
        period_id: String,    
        amount: Number,
    }
);
export default model('debt', debtSchema);
'*********************************************************************'

const paymentSchema = new Schema(
    {
        rental_id: String,
        period_id: String,    
        amount: Number,
        paid_at: Date,
        recibo_n: String,
        method_paid: String,
        completed: Boolean,
        tocharged: Number
    }
);
export default model('payment', debtSchema);
'*********************************************************************'

const periodSchema = new Schema(
    {
    month_name: String,
    year_number: Number,
    month_next_id: String,
    month_prev_id: String,
})
export default model("period", periodSchema);
'*********************************************************************'

const ClientSchema = new Schema({
    name: { type: String, required: true },
    telephone: { type: String, default: '' },
    DNI: String,
    business: String,
    active: { type: Boolean, default: true },
});
module.exports = model('client', ClientSchema);
'*********************************************************************'

const ContainerSchema = new Schema({
    id_container: { type: Number, unique: true, required: true, },
    price_tocharge: { type: Number, required: true },
    rented_by: { type: String, required: true },
    rented_by_id: String,
    active: Boolean,
});
module.exports = model('container', ContainerSchema);
'*********************************************************************'
