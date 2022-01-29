"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const debtSchema = new mongoose_1.Schema({
    rental_id: String,
    period_id: String,
    amount: Number,
    completed: Boolean,
});
exports.default = (0, mongoose_1.model)('debt', debtSchema);
'*********************************************************************';
