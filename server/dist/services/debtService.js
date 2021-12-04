"use strict";
// import Container, { IContainer } from '../models/Container';
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
exports.getDebtInfoService = exports.updateDebtService = exports.updateDebtByPaymentService = exports.createDebtService = void 0;
const mongodb_1 = require("mongodb");
const Debt_1 = __importDefault(require("../models/Debt"));
let objRental = undefined;
function createDebtService(nCtner, client) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * This function execute just when create a new rental.
         * Date: Nov-20th.2021
         */
        try {
            const debtinfo = new Debt_1.default({
                number_ctner: nCtner,
                name_client: client,
                current_debt: 0,
                price_rental: 0,
                overdue_debt: 0,
                paid_current_per: ''
            });
            console.log("=============(NEW DEBT)=============");
            console.log(debtinfo);
            return yield debtinfo.save();
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createDebtService = createDebtService;
function getValueDebt() {
    var importe = -1;
    if (!objRental)
        return -1;
    const per = objRental.last_deuda_per;
    const arDeudas = objRental.deuda_register;
    arDeudas.forEach(deuda => {
        if (deuda.period == per) {
            importe = deuda.value;
        }
    });
    return importe;
}
function updateDebtByPaymentService(id_debt, importe) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const objDebt = yield Debt_1.default.findById(id_debt);
            if (!objDebt) {
                return null;
            }
            objDebt.current_debt -= importe;
            objDebt.overdue_debt -= importe;
            console.log("==========(DEBT BEFORE PAYMENT)=========");
            console.log(importe);
            console.log(objDebt);
            return yield objDebt.save();
        }
        catch (error) {
            return null;
        }
    });
}
exports.updateDebtByPaymentService = updateDebtByPaymentService;
function updateDebtService(alquiler) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            objRental = alquiler;
            // const debtinfo: IDebt = Debt.findById(new ObjectID(id));
            const currentDebt = +objRental.deuda_total - objRental.pagos_total - objRental.last_payment.a_cta;
            // +objRental.deuda_total - objRental.pagos_total;
            const priceByMonth = getValueDebt();
            const difer = (currentDebt - priceByMonth);
            const atras = (difer > 0) ? difer : 0;
            const debt = {
                current_debt: currentDebt,
                // current_debt: -1,
                price_rental: priceByMonth,
                overdue_debt: atras,
                paid_current_per: '0'
            };
            const id = new mongodb_1.ObjectID(objRental.id_debtinfo.toString());
            console.log("===========(DEBT-INFO)===========");
            console.log(debt);
            return yield Debt_1.default.findByIdAndUpdate(id, debt);
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.updateDebtService = updateDebtService;
function getDebtInfoService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const aDebtInfo = yield Debt_1.default.find();
            console.log("===========(DEBT-TABLE-FIND)===========");
            console.log(aDebtInfo);
            return yield aDebtInfo;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getDebtInfoService = getDebtInfoService;
