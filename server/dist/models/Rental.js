"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * Class created by EHER Jan.26th,2022
 *  Rental containers- Project js.
 */
const rentalSchema = new mongoose_1.Schema({
    id_client: { type: String, required: true },
    id_container: { type: String, required: true },
    active: Boolean,
    date_init: {
        type: Date, default: Date.now, required: true
    },
    date_final: Date,
    deuda_total: Number,
    pagos_total: Number,
    last_payment_id: String,
    last_debt_id: String,
    price_tocharge: Number
});
exports.default = (0, mongoose_1.model)('rental', rentalSchema);
'*********************************************************************';
