"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDebtsController = void 0;
const Debt_1 = __importDefault(require("../models/Debt"));
const rentalService_1 = require("../services/rentalService");
const debtService_1 = require("../services/debtService");
function insertDebtsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /** Date: Jan.30th.2022
         *  Try to insert Debt to database from next period.-
         */
        try {
            const alquileres = yield (0, rentalService_1.getlistAlquilerService)();
            if (!alquileres) {
                res.status(466).json({ message: " There's not rental data on database.", status: 466 });
                return;
            }
            let texto = "";
            for (const alquiler of alquileres) {
                texto += yield CreateDebtObject(alquiler);
            }
            ;
            res.json(texto);
        }
        catch (error) {
            res.status(460).json({
                message: "Error: There's Problem to try create New Debt!"
            });
        }
    });
}
exports.insertDebtsController = insertDebtsController;
function CreateDebtObject(alquiler) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id, price_tocharge } = alquiler;
        let amount = (!price_tocharge) ? -1 : price_tocharge;
        const debt = new Debt_1.default({
            rental_id: _id,
            period_id: 'ID-CURRENT-MONTH',
            amount: amount
        });
        return yield (0, debtService_1.insertDebtService)(debt);
    });
}
