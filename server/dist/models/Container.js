"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuidv4_1 = require("uuidv4");
const ContainerSchema = new mongoose_1.Schema({
    id_container: { type: Number, required: true },
    description: { type: String, default: "" },
    price_tocharge: Number,
    rented_by: String,
    rented_by_id: { type: String, default: (0, uuidv4_1.uuid)() },
    active: { type: Boolean, default: false }
});
exports.default = (0, mongoose_1.model)('container', ContainerSchema);
