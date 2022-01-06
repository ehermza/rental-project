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
exports.updateClientService = exports.createClientService = exports.getClientOneService = exports.getClientsService = void 0;
const Client_1 = __importDefault(require("../models/Client"));
function getClientsService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Client_1.default.find();
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getClientsService = getClientsService;
;
function getClientOneService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Client_1.default.findById(id);
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getClientOneService = getClientOneService;
;
function createClientService(objclient) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield objclient.save();
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createClientService = createClientService;
function updateClientService(id, objclient) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log('(clientService) findByIdAndUpdate()', objclient);
            return yield Client_1.default.findByIdAndUpdate(id, objclient);
        }
        catch (error) {
            console.log('(ERROR) findByIdAndUpdate()', objclient);
            throw new Error();
        }
    });
}
exports.updateClientService = updateClientService;
;
