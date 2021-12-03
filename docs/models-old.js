
const rental = new Schema({
    id_client: String, 
    id_container: String,
    active: Boolean,
    date_init: Date,
    date_final: Date,
    deuda_total: Number,
    deuda_register[]: {
        value: number,
        period: String,
    }
    pagos_total: Number,
    pagos_register[]: {
        value: number,
        period: String,
        paid_at: Date,
        recibo_n: String
    }
    last_payment: {
        period: String,
        a_cta: number,
    }
});
*******************************************************

const pagoSchema = new Schema({
//    client: { type: String, default: '@Nombre' },
//    id_container: Number,
    id_rental: String,    
    value: { type: Number, required: true },
    month_paid: { type: String, default: '' },
    paid_at: { type: Date, default: Date.now() },
    recibo_n: { type: String, default: '000000' },
});
module.exports = model('pago', pagoSchema);
*******************************************************

const deudaSchema = new Schema({
//    client: { type: String, default: '@Nombre' },
//    id_container: Number,
    id_rental: String,
    value: { type: Number, required: true },
    period: { type: String, default: '' },
});
module.exports = model('deuda', deudaSchema);
*******************************************************

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
