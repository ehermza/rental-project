"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rentalSchema = new mongoose_1.Schema({
    id_client: { type: String, required: true },
    id_container: { type: String, required: true },
    id_debtinfo: String,
    active: Boolean,
    date_init: {
        type: Date,
        default: Date.now,
        required: true
    },
    date_final: Date,
    deuda_total: Number,
    deuda_register: [{
            value: Number,
            period: String
        }],
    pagos_total: Number,
    pagos_register: [{
            value: Number,
            period: String,
            paid_at: Date,
            recibo_n: String
        }],
    last_payment: {
        period: String,
        a_cta: Number
    },
    last_deuda_per: String
});
exports.default = (0, mongoose_1.model)('rental', rentalSchema);
