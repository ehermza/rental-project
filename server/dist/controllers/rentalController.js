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
exports.insertDebtController = exports.getMonthNumberController = exports.createAlquilerCtrl = exports.createPaymentCtrl = exports.getPagosCtrl = exports.getSaldoByCtnerCtrl = exports.deletePaymentCtrl = exports.getRentalByCtnerController = exports.getPaymentByCtnerCtrl = void 0;
const mongodb_1 = require("mongodb");
const rentalService_1 = require("../services/rentalService");
const containerService_1 = require("../services/containerService");
const debtService_1 = require("../services/debtService");
const debtService_2 = require("../services/debtService");
function getPaymentByCtnerCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         *  First find the Rental active from: (req.params).id_container
         *  .. then return pagos_register
         */
        try {
            const { id } = req.params;
            const pagos = yield rentalService_1.getPaymentByCtnerServ(id);
            if (!pagos) {
                res.status(580).json({ message: 'Container is not active or not exist:' });
            }
            res.json(pagos);
        }
        catch (error) {
            res.status(506).json({ status: 506, message: 'Error to try get pagos from database' });
        }
    });
}
exports.getPaymentByCtnerCtrl = getPaymentByCtnerCtrl;
function getRentalByCtnerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idctner } = req.params;
            const rental = yield rentalService_1.getRentalByCtnerService(idctner);
            if (!rental) {
                res.status(569).json({ status: 569, message: 'Rental object requested is not exists.' });
            }
            res.json(rental);
        }
        catch (error) {
            res.status(579).json({ status: 579, message: 'Error to try get Alquiler object.' });
        }
    });
}
exports.getRentalByCtnerController = getRentalByCtnerController;
function deletePaymentCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const { idpayment, idctner } = req.params;
            const { recibo, idctner } = req.params;
            console.log(req.body);
            const result = yield rentalService_1.deletePaymentByCtnerServ(recibo, idctner);
            if (!result) {
                res.status(536).json({ message: 'Fail to try delete payment.' });
            }
            res.json(result);
        }
        catch (error) {
        }
    });
}
exports.deletePaymentCtrl = deletePaymentCtrl;
function getSaldoByCtnerCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield rentalService_1.getSaldoByCtnerService(id);
            res.json({ saldo: result });
        }
        catch (error) {
            res.status(516).json({ message: 'Error to try get (saldo actual) of client.' });
        }
    });
}
exports.getSaldoByCtnerCtrl = getSaldoByCtnerCtrl;
function getPagosCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /*
              try {
                const pagos = await getPagosService();
                res.json(pagos);
        
            } catch (error) {
                res.status(506).json({ status: 506, message: 'Error to try get pagos from database' });
            }
        */
    });
}
exports.getPagosCtrl = getPagosCtrl;
function createPaymentCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { container, value } = req.body;
            /** const container is 'id_container' property
             *      from Container class */
            console.log(' (body) ', req.body);
            const objCtner = yield containerService_1.getContainerOneServ(new mongodb_1.ObjectID(container));
            if (!objCtner) {
                res.status(714).json({ message: 'Container object not defined!' });
                return;
            }
            const idclient = objCtner.rented_by_id;
            const alquiler = yield rentalService_1.insertPaymentService(idclient, req.body);
            if (!alquiler) {
                res.status(710).json({ message: 'Can\'t create Payment: Rental Object is null or undefined.' });
                return;
            }
            const id_debt = alquiler.id_debtinfo.toString();
            yield debtService_1.updateDebtByPaymentService(id_debt, parseFloat(value));
            res.json(alquiler);
        }
        catch (error) {
            res.status(707).json({ message: 'Error to try GET Rent object.' });
        }
    });
}
exports.createPaymentCtrl = createPaymentCtrl;
function createAlquilerCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const {idclient, idctner, fecha} = req.body;
            const { ptr_client, ptr_ctner, client_name, ctner_number } = req.body;
            console.log("=========(REQ.BODY)=========");
            console.log(req.body);
            // const fecha = Date.now();
            const debtinfo = yield debtService_2.createDebtService(ctner_number, client_name);
            if (!debtinfo) {
                res.status(711);
                return;
            }
            const ptr_debt = debtinfo._id;
            const alquiler = yield rentalService_1.createAlquilerService(ptr_client, ptr_ctner, ptr_debt, Date.now());
            res.json(alquiler);
        }
        catch (error) {
            res.status(730).json({ status: 730, message: 'Error to try create Alquiler object!' });
        }
    });
}
exports.createAlquilerCtrl = createAlquilerCtrl;
function getMonthNumberController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // this shit works! jojo..
        try {
            const { idctner } = req.params;
            const ra = yield rentalService_1.getMonthNumberService(idctner);
            res.json(ra);
        }
        catch (error) {
        }
    });
}
exports.getMonthNumberController = getMonthNumberController;
function insertDebtController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // var aCtnersActive: IContainer[] = [];
            const ctners = yield containerService_1.getContainersServ();
            console.log("========(CONTAINERS TODOS)========");
            console.log(ctners);
            /** Filter Containers 'Activos' and then, insert debt. */
            var aCtners = ctners.filter((container) => container.active);
            var errno = 0;
            var totaltoCharge = 0;
            aCtners.forEach(function (container) {
                return __awaiter(this, void 0, void 0, function* () {
                    totaltoCharge += container.price_tocharge;
                    errno = yield insertDebtByCtner(container);
                    if (errno) {
                        res.status(errno).json({ status: errno });
                        return;
                    }
                });
            });
            res.json({ totaltoCharge });
        }
        catch (error) {
            res.status(770).json({
                status: 770,
                message: 'Error to Try Insert Deuda de todos los Alquileres Activos.-'
            });
        }
    });
}
exports.insertDebtController = insertDebtController;
// export async function insertDebtController(req: Request, res: Response) 
function insertDebtByCtner(ctnerObj) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Works OK! November,23th. 2021
         */
        try {
            // const objCtner: IContainer | null =
            //     await getContainerOneServ((idctnerObj));
            // if (!objCtner) {
            //     // res.status(714).json({ message: 'Container object not defined!' });
            //     return 714;
            // }
            const idctner = ctnerObj._id.toString();
            const idclient = ctnerObj.rented_by_id;
            const price = ctnerObj.price_tocharge;
            var alquiler = yield rentalService_1.getRentalObjectServ(idclient, idctner);
            if (!alquiler) {
                // res.status(710).json({ message: 'Rental object is null or undefined.' });
                return 710;
            }
            yield rentalService_1.insertDebtService(alquiler, price);
            alquiler = yield rentalService_1.getRentalObjectServ(idclient, idctner);
            if (!alquiler) {
                // res.status(710).json({ message: 'Rental object is null or undefined.' });
                return 711;
            }
            console.log("===============(ALQUILER)=================");
            console.log(alquiler);
            /**
             * Update Object Debt to print Debts table.
             */
            yield debtService_2.updateDebtService(alquiler);
            return 0;
        }
        catch (error) {
            return 707;
            // res.status(707).json({ message: 'Error to try GET Rent object.' })
        }
    });
}
/**

export async function insertDebtController(req: Request, res: Response) {
    try {
        const { idctner } = req.params;
        const price = await insertDebtService(idctner);
        if (price == -1) {
            res.status(779).json({ status: 779, message: "Error to try get Container Price." });
        }
        const rpta= {
            "price_tocharge": price
        }
        res.json(rpta);

    } catch (error) {

    }
}
*/ 
