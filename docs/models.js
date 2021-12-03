
const ClientSchema = new Schema({
    name: { type: String, required: true },
    telephone: { type: String, default: 'Ingresar' },
    DNI: String,
    business: String,
    active: { type: Boolean, default: true },
});
module.exports = model('client', ClientSchema);
*******************************************************

const ContainerSchema = new Schema({
    id_container: { type: Number, unique: true, required: true, },
    price_tocharge: { type: Number, required: true },
    rented_by: { type: String, required: true },
    rented_by_id: String,
    active: Boolean,
});
module.exports = model('container', ContainerSchema);
*******************************************************
 
const rentalSchema = new Schema(
    {
        id_client: {type:String, required:true},
        id_container: {type:String, required:true},
        id_debtinfo: String,

        active: Boolean,
        date_init: {
            type:Date, 
            default: Date.now,
            required: true
        },
        date_final: Date,
        deuda_total: Number,
        deuda_register: [{value: Number,period: String}],
        pagos_total: Number,
        pagos_register: [{
            value: Number,
            period: String,
            paid_at: Date,
            recibo_n: String
        }],
        last_payment: {
            period: String, a_cta: Number
        }
   }
);
export default model<IRental>('rental', rentalSchema);
*********************************************************************

const DebtSchema = new Schema(
    {
        number_ctner: { type: String }, 
        name_client: { type: String }, 
        current_debt: { type: Number },
        price_rental: { type: Number }, 
        overdue_debt: { type: Number }, 
        paid_current_per: { type: String }, 
    }
);
export default model<IDebt>('debt', DebtSchema);



