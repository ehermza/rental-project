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
exports.createAlquilerCtrl = void 0;
const rentalService_1 = require("../services/rentalService");
//  Edit! SUCCESS Jan.28th,2022
function createAlquilerCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const {idclient, idctner, fecha} = req.body;
            const { ptr_client, ptr_ctner, client_name, ctner_number } = req.body;
            console.log("=========(REQ.BODY)=========");
            console.log(req.body);
            /*
                    const debtinfo: IDebt | undefined =
                        await createDebtService(ctner_number, client_name);
                    if (!debtinfo) {
                        res.status(711);
                        return;
                    }
                    const ptr_debt: string = debtinfo._id;
             */
            const alquiler = yield (0, rentalService_1.createAlquilerService)(ptr_client, ptr_ctner, "0", Date.now());
            res.json(alquiler);
        }
        catch (error) {
            res.status(730).json({ status: 730, message: 'Error to try create Alquiler object!' });
        }
    });
}
exports.createAlquilerCtrl = createAlquilerCtrl;
