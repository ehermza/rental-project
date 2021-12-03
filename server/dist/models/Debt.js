"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DebtSchema = new mongoose_1.Schema({
    number_ctner: { type: Number, required: true },
    name_client: String,
    current_debt: { type: Number, required: true },
    price_rental: { type: Number, required: true },
    overdue_debt: { type: Number, default: 0 },
    paid_current_per: { type: String, default: 'not per.' }
});
exports.default = mongoose_1.model('debt', DebtSchema);
