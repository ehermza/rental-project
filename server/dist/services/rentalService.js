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
exports.findAndUpdateService = exports.getlistAlquilerService = exports.createAlquilerService = void 0;
const Rental_1 = __importDefault(require("../models/Rental"));
const mongodb_1 = require("mongodb");
//  Edit! SUCCESS Jan.28th,2022
function createAlquilerService(id_client, id_container, idDebt, fecha) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const alquiler:IRental       
            const alquiler = new Rental_1.default({
                id_client,
                id_container,
                // id_debtinfo: idDebt,
                active: true,
                date_init: fecha,
                deuda_total: 0,
                pagos_total: 0,
                last_payment_id: "",
                last_debt_id: ""
                // deuda_register: [],
                // pagos_register: [], 
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
function getlistAlquilerService() {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Date: Jan.30th,2022 | It's Working OK!
         **/
        try {
            const filter = {
                active: true
            };
            const listRental = yield Rental_1.default.find(filter);
            /*
                    const IDLIST: string[] = [];
                    listRental.forEach(
                        listRental => {
                            IDLIST.push(listRental._id);
                        });
             */
            return listRental;
        }
        catch (error) {
            return null;
        }
    });
}
exports.getlistAlquilerService = getlistAlquilerService;
// export async function findAndUpdateService(idRental: string, dbto: IDebt)
function findAndUpdateService(alquiler, update_per) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /**
             * Created Date: Jan 01th,2022
             */
            const { _id, price_tocharge, deuda_total } = alquiler;
            const filter = {
                _id: new mongodb_1.ObjectID(_id)
            };
            if (!price_tocharge)
                return null;
            const totaldebt = deuda_total.valueOf() + price_tocharge.valueOf();
            const update = {
                'last_debt_per': update_per,
                'deuda_total': totaldebt
            };
            return yield Rental_1.default.findOneAndUpdate(filter, update, {
                new: true
            });
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.findAndUpdateService = findAndUpdateService;
function getNextPeriodService(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
        }
    });
}
