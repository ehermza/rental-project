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
exports.deleteContainerServ = exports.updateContainerServ = exports.createContainerServ = exports.getContByNumberService = exports.getPriceContainerService = exports.getContainerOneServ = exports.getContainersServ = void 0;
const Container_1 = __importDefault(require("../models/Container"));
function getContainersServ() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // return await Container.find({ rented_by: { $ne: '' }}).sort({id_container:-1});
            // return await Container.find();
            return yield Container_1.default.find().sort({ id_container: -1 });
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.getContainersServ = getContainersServ;
function getContainerOneServ(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Container_1.default.findById(id);
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.getContainerOneServ = getContainerOneServ;
function getPriceContainerService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cont = yield Container_1.default.findById(id);
            if (!cont)
                return -1;
            return cont.price_tocharge;
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.getPriceContainerService = getPriceContainerService;
function getContByNumberService(idctner) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = { 'id_container': idctner.toString() };
            return yield Container_1.default.findOne(filter);
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.getContByNumberService = getContByNumberService;
function createContainerServ(objprod) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield objprod.save();
            // console.log(objprod);
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.createContainerServ = createContainerServ;
function updateContainerServ(id, objprod) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Container_1.default.findByIdAndUpdate(id, objprod);
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.updateContainerServ = updateContainerServ;
function deleteContainerServ(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Container_1.default.findByIdAndDelete(id);
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.deleteContainerServ = deleteContainerServ;
/**
 * Code written by ehermza Date: August 08th, 2021.
 */
