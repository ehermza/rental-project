"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PagoSchema = new mongoose_1.Schema({
    client: { type: String, required: true },
    value: { type: Number, required: true },
    id_container: { type: Number, required: true },
    month_paid: String,
    paid_at: { type: Date, default: Date.now() },
    recibo_n: String,
    client_name: String
});
exports.default = mongoose_1.model('pago', PagoSchema);
