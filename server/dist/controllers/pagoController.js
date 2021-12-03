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
exports.createPagoCtrl = exports.getPagosByClientCtrl = exports.getPagosCtrl = void 0;
const Pago_1 = __importDefault(require("../models/Pago"));
const pagoService_1 = require("../services/pagoService");
function getPagosCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pagos = yield pagoService_1.getPagosService();
            res.json(pagos);
        }
        catch (error) {
            res.status(506).json({ status: 506, message: 'Error to try get pagos from database' });
        }
    });
}
exports.getPagosCtrl = getPagosCtrl;
function getPagosByClientCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idclient, nctner } = req.params;
            console.log(`idclient(${idclient}) nctner(${nctner})`);
            const pagos = yield pagoService_1.getPagosByClientService(idclient, parseInt(nctner));
            res.json(pagos);
        }
        catch (error) {
            res.status(506).json({ status: 506, message: 'Error to try get pagos from database' });
        }
    });
}
exports.getPagosByClientCtrl = getPagosByClientCtrl;
function createPagoCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pago = new Pago_1.default(req.body);
            // const { client, value, id_container, month_paid, paid_at,recibo } = req.body;
            /*         const pago: IPago = new Pago({
                        client: client,
                        value: value,
                        id_container,
                        month_paid,
                        paid_at,
                        recibo: recibo
                    });
                    */
            yield pagoService_1.createPagoService(pago);
            console.log(req.body);
        }
        catch (error) {
            res.status(510).json({ status: 510, message: 'Error to try create a new pay' });
        }
    });
}
exports.createPagoCtrl = createPagoCtrl;
