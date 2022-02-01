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
        /** Date: Jan.30th.2022  SUCCESS. WORKING OK!
         *  Try to insert Debt to database from next period.-
         */
        try {
            const alquileres = yield (0, rentalService_1.getlistAlquilerService)();
            if (!alquileres) {
                res.status(466).json({ message: " There's not rental data on database.", status: 466 });
                return;
            }
            for (const alquiler of alquileres) {
                const { _id } = alquiler;
                const dbto = yield CreateDebtObject(alquiler);
                if (!dbto) {
                    continue;
                }
                const update = dbto.period_id.toString();
                const findandupdate = yield (0, rentalService_1.findAndUpdateService)(_id, update);
                console.log(update);
                console.log("=========(UPDATE)==========");
                console.log(findandupdate);
            }
            ;
            res.json({ message: "Total Debts registered: " + alquileres.length });
        }
        catch (error) {
            res.status(460).json({
                message: "Error: There's Problem to try create New Debt!"
            });
        }
    });
}
exports.insertDebtsController = insertDebtsController;
/*
async function UpdateLastDebt(idRental:String, ptrDebt:String)
 {
    try {
        const filter = { '_id': idRental }
        const update = { 'last_debt_id': ptrDebt }
        await Rental.findByIdAndUpdate(idRental, update);
    }
    catch (error) {
        
    }
}
 */
function CreateDebtObject(alquiler) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id, price_tocharge, last_debt_per } = alquiler;
        let amount = (!price_tocharge) ? -1 : price_tocharge;
        let ptrPeriod = "61f49146ac6c5cf15c191b1a";
        if (last_debt_per) {
            ptrPeriod = yield (0, debtService_1.getNextPeriodService)(last_debt_per);
            console.log("=============(GETNEXTPERIOD)=============");
            console.log(ptrPeriod);
        }
        /**
         * Creating the new Debt Collection on database;
         */
        const debt = new Debt_1.default({
            rental_id: _id,
            period_id: ptrPeriod,
            amount: amount
        });
        return yield (0, debtService_1.insertDebtService)(debt);
    });
}
