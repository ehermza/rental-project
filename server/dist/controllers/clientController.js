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
exports.updateClientCtrl = exports.createClientCtrl = exports.getClientOneCtrl = exports.getClientsCtrl = void 0;
const Client_1 = __importDefault(require("../models/Client"));
const mongodb_1 = require("mongodb");
const clientService_1 = require("../services/clientService");
function getClientsCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const clients = yield (0, clientService_1.getClientsService)();
            console.log(clients);
            res.json(clients);
        }
        catch (error) {
            res.status(507).json({ status: 507, message: 'Error to try get list of clients' });
        }
    });
}
exports.getClientsCtrl = getClientsCtrl;
;
function getClientOneCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const client = yield (0, clientService_1.getClientOneService)(new mongodb_1.ObjectID(id));
            res.json(client);
        }
        catch (error) {
            res.status(510).json({ status: 510, message: 'Error to try get one client' });
        }
    });
}
exports.getClientOneCtrl = getClientOneCtrl;
/*
    export async function getClientByIdContCtrl(req:Request, res:Response) {
    try {
        const {idctner} = req.params;
        const client = await getContByNumberService(parseInt(idctner));
        console.log(`RE: getClientByIdContCtrl: ${client}`);

    } catch (error) {
        
    }
}
 */
function createClientCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, telephone, cuit, business } = req.body;
            const client = new Client_1.default({
                name,
                telephone,
                DNI: cuit,
                business,
                rent_info: []
            });
            yield (0, clientService_1.createClientService)(client);
            res.json(client);
        }
        catch (error) {
            res.status(504).json({ status: 504, message: 'Error to try create a new client' });
        }
    });
}
exports.createClientCtrl = createClientCtrl;
;
function updateClientCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const objclient = yield (0, clientService_1.updateClientService)(new mongodb_1.ObjectID(id), req.body);
            console.log('(clientController) updateClientCtrl(req,res) = ', req.params);
            res.json(objclient);
        }
        catch (error) {
            res.status(501).json({ status: 501, message: 'Error to try update a saved client' });
        }
    });
}
exports.updateClientCtrl = updateClientCtrl;
