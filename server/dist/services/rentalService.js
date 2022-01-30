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
exports.getListAlquilerService = exports.createAlquilerService = void 0;
const Rental_1 = __importDefault(require("../models/Rental"));
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
function getListAlquilerService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = {
                active: true
            };
            const listAlquiler = yield Rental_1.default.find(filter);
            const IDLIST = [];
            listAlquiler.forEach(listAlquiler => {
                IDLIST.push(listAlquiler._id);
            });
            console.log("===========(ACTIVE RENTALS)============");
            console.log(IDLIST);
        }
        catch (error) {
        }
    });
}
exports.getListAlquilerService = getListAlquilerService;
