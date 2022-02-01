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
exports.getNextPeriodService = exports.insertDebtService = void 0;
const Period_1 = __importDefault(require("../models/Period"));
function insertDebtService(debito) {
    return __awaiter(this, void 0, void 0, function* () {
        /** Date: Jan.30th.2022
         *  Try to insert Debt to database from next period.-
         *  SUCCESS. WORKING OK!
         */
        try {
            return yield debito.save();
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.insertDebtService = insertDebtService;
function getNextPeriodService(ptrCurrentPer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const objPer = yield Period_1.default.findById(ptrCurrentPer);
            if (!objPer) {
                return "";
            }
            console.log("=============(CURRENT/PERIOD)=============");
            console.log(objPer);
            return objPer.month_next_id;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getNextPeriodService = getNextPeriodService;
/* export async function getNextPeriodService(ptrDebtLast:string):
    Promise<string> {
    try {
        // const obj:ObjectId
        const filter = {
            _id: new ObjectID(ptrDebtLast)
        }
        const lastdebt:IDebt = await Debt.findOne(filter);
        console.log(filter);
        
        // const lastdebt:IDebt = await Debt.findById(ptrDebtLast);
        if(! lastdebt) {
            return ""
        }
        console.log("=============(DEBT/LAST)=============");
        console.log(lastdebt);

        const ptrCurrentPer: String = lastdebt.period_id;
        const objPer:IPeriod| null = await Period.findById(ptrCurrentPer);
        if(! objPer) {
            return "";
        }
        return objPer.month_next_id;

    } catch (error) {
        return "";
    }
} */ 
