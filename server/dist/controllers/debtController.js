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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDebtByPaymentController = exports.getListDebts = void 0;
const debtService_1 = require("../services/debtService");
function getListDebts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield debtService_1.getDebtInfoService();
            res.json(list);
        }
        catch (error) {
            res.status(914).json({
                status: 914,
                message: "Error to try get list debts"
            });
        }
    });
}
exports.getListDebts = getListDebts;
function setDebtByPaymentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
        }
    });
}
exports.setDebtByPaymentController = setDebtByPaymentController;
