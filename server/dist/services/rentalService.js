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
exports.insertDebtService = exports.insertPaymentService = exports.createAlquilerService = exports.getRentalObjectServ = exports.getPagosByClientService = exports.getPaymentByCtnerServ = exports.deletePaymentByCtnerServ = exports.getPagosService = exports.getSaldoByCtnerService = exports.getRentalByCtnerService = exports.getRentalByIdService = exports.getMonthNumberService = void 0;
const Rental_1 = __importDefault(require("../models/Rental"));
const mongodb_1 = require("mongodb");
const strmonth = "ENE,FEB,MAR,ABR,MAY,JUN,JUL,AGO,SEP,OCT,NOV,DIC";
function getMonthNumberService(idCtner) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const arrayt = strmonth.split(',');
            const rental = yield getRentalByCtnerService(idCtner);
            if (!rental) {
                return -1;
            }
            const fecha = rental.date_init;
            return arrayt[fecha.getMonth()];
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getMonthNumberService = getMonthNumberService;
function getRentalByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Rental_1.default.findById(new mongodb_1.ObjectID(id));
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getRentalByIdService = getRentalByIdService;
function getRentalByCtnerService(idCtner) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Date: 19 Sept, 2021
         * Get the object Rental from one Container actually active  */
        try {
            const filter = {
                'id_container': idCtner,
                'active': true
            };
            return yield Rental_1.default.findOne(filter);
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getRentalByCtnerService = getRentalByCtnerService;
function getSaldoByCtnerService(idCtner) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = {
                'id_container': idCtner,
                'active': true
            };
            console.log(filter);
            const alquiler = yield Rental_1.default.findOne(filter);
            if (!alquiler)
                return -1;
            return (alquiler.deuda_total - alquiler.pagos_total);
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getSaldoByCtnerService = getSaldoByCtnerService;
function getPagosService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
        }
    });
}
exports.getPagosService = getPagosService;
// export async function deletePaymentByCtnerServ(idPayment: string, idCtner: string)
function deletePaymentByCtnerServ(recibo, idCtner) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = {
                'id_container': idCtner,
                'active': true
            };
            console.log(filter);
            const objRent = yield Rental_1.default.findOne(filter);
            if (!objRent)
                return null; /** don't can find an active rental */
            // console.log(recibo);
            console.log(objRent.pagos_register);
            /**
             * Delete the Payment Register on Rental object (by Recibo number) */
            const register = objRent.pagos_register.filter((item) => (item.recibo_n != recibo));
            objRent.pagos_register = register;
            var vartotal = 0;
            register.forEach((item) => {
                vartotal += item.value;
            });
            objRent.pagos_total = vartotal;
            objRent.save();
            // console.log(register);
            return objRent;
        }
        catch (error) {
        }
    });
}
exports.deletePaymentByCtnerServ = deletePaymentByCtnerServ;
function getPaymentByCtnerServ(idCtner) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = {
                'id_container': idCtner,
                'active': true
            };
            console.log(filter);
            const alquiler = yield Rental_1.default.findOne(filter);
            if (!alquiler)
                return null;
            return yield alquiler.pagos_register;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getPaymentByCtnerServ = getPaymentByCtnerServ;
function getPagosByClientService(idClient, nCtner) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // return await Pago.find();
            const filter = {
                'client': idClient,
                'id_container': nCtner
            };
            const alq = yield Rental_1.default.findOne(filter);
            if (alq == null)
                return {};
            const register = alq.pagos_register;
            return register;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getPagosByClientService = getPagosByClientService;
// insertPayment(importe: number, fecha: Date, per: String, recibo?:String): number
function getRentalObjectServ(idClient, idCtner) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = {
                "id_client": idClient,
                "id_container": idCtner
            };
            console.log('(getRentalObjectServ) filter: ', filter);
            return yield Rental_1.default.findOne(filter).exec();
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getRentalObjectServ = getRentalObjectServ;
function createAlquilerService(idClient, idCtner, idDebt, fecha) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const alquiler:IRental       
            const alquiler = new Rental_1.default({
                id_client: idClient,
                id_container: idCtner,
                id_debtinfo: idDebt,
                active: true,
                date_init: fecha,
                deuda_total: 0,
                deuda_register: [],
                pagos_total: 0,
                pagos_register: [],
                last_payment: {
                    a_cta: 0, period: "ENE"
                }
            });
            // const rental: IRental = alquiler;
            console.log("========(createAlquilerService)========");
            console.log(alquiler);
            return yield alquiler.save();
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createAlquilerService = createAlquilerService;
function queryNextMonth(period) {
    var res = "ENE";
    // const fromdatabase: string = objRent.last_payment.period;
    const meses = strmonth.split(',');
    for (var i = 0; i < 12; i++) {
        if (period == meses[i]) {
            res = meses[i + 1];
            break;
        }
    }
    return res;
}
function getValueByPeriod(arDeudas, month) {
    /**
     *  Query value that client must to pay on period 'month'
     *      from Array 'deuda_register' (database)
     */
    console.log(arDeudas);
    var valueToPay = 0;
    arDeudas.forEach(debt => {
        if (debt.period == (month)) {
            valueToPay = debt.value.valueOf();
        }
    });
    return valueToPay;
}
// export async function insertPaymentService(objRent:IRental, pago:RgtPago)
function insertPagoRegister(objRent, importe, mes, recibo) {
    return __awaiter(this, void 0, void 0, function* () {
        const pago = {
            value: (importe),
            period: mes,
            paid_at: new Date(),
            recibo_n: recibo
        };
        objRent.pagos_register.push(pago);
        yield objRent.save();
    });
}
function insertPaymentService(objRent, body) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Client Payment: Try to register period correct to set payment.
         *     Date: Nov.09th 2021  Author: EHER/2021
         */
        try {
            console.log("===========(ALQUILER)===========");
            console.log(objRent);
            const { container, value, recibo_n } = body;
            const cta_anter = objRent.last_payment.a_cta;
            const value_paid = value + cta_anter;
            const PerOriginal = objRent.last_payment.period;
            const arDeudas = objRent.deuda_register;
            const valueByPeriod = getValueByPeriod(arDeudas, PerOriginal);
            const PerProximo = queryNextMonth(PerOriginal);
            const difer = +value_paid - valueByPeriod;
            const month = (difer < 0) ? PerOriginal : PerProximo;
            const vuelto = (difer < 0) ? value_paid : difer;
            if (difer >= 0) {
                /** If client canceled current period debt, then..
                 *    put payment on db: 'pagos_register' property
                 **/
                insertPagoRegister(objRent, valueByPeriod, PerOriginal, recibo_n);
                yield objRent.update({
                    pagos_total: objRent.pagos_total + valueByPeriod,
                });
            }
            yield objRent.update({
                // pagos_total: objRent.pagos_total + value_paid,
                last_payment: {
                    period: month, a_cta: vuelto
                }
            });
            return objRent;
        }
        catch (error) {
            return -1;
        }
    });
}
exports.insertPaymentService = insertPaymentService;
function insertDebtService(objRent, price) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const PerProximo = queryNextMonth(objRent.last_deuda_per);
            const debt = {
                value: price,
                period: PerProximo // urgent to change!
            };
            objRent.deuda_register.push(debt);
            yield objRent.save();
            // const total: number = objRent.deuda_total + price;
            yield objRent.updateOne({
                deuda_total: objRent.deuda_total + price,
                last_deuda_per: PerProximo
            });
            return objRent;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.insertDebtService = insertDebtService;
