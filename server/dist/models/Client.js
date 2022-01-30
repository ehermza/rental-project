"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const ClientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    telephone: String,
    DNI: String,
    business: String,
    active: { type: Boolean, default: true },
    info_ad: String,
});
exports.default = (0, mongoose_1.model)('client', ClientSchema);
