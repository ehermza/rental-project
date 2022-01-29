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
exports.deleteContainerCtrl = exports.updateContainerCtrl = exports.insertContainersController = exports.createContainerCtrl = exports.getContainerOneCtrl = exports.getContbyNumberCtrl = exports.getContainersCtrl = exports.getCurrentPerController = void 0;
const Container_1 = __importDefault(require("../models/Container"));
// import GlobalDt, { IGlobalDt } from "../models/GlobalDt";
const mongodb_1 = require("mongodb");
const containerService_1 = require("../services/containerService");
function getCurrentPerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const per = yield (0, containerService_1.getCurrentPerService)();
            res.json(per);
        }
        catch (error) {
            res.status(589).json({ status: 589, message: 'Failed to try find current debt period from database' });
        }
    });
}
exports.getCurrentPerController = getCurrentPerController;
function getContainersCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const containers = yield (0, containerService_1.getContainersServ)();
            res.json(containers);
        }
        catch (error) {
            res.status(500).json({ status: 500, message: 'Failed to try find all containers from database' });
        }
    });
}
exports.getContainersCtrl = getContainersCtrl;
function getContbyNumberCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idctner } = req.params;
            console.log(`req.params: idctner ${idctner}`);
            const client = yield (0, containerService_1.getContByNumberService)(parseInt(idctner));
            console.log(`RE: getContbyNumberCtrl: ${client}`);
            res.json(client);
        }
        catch (error) {
            res.status(509).json({ status: 509, message: 'Failed to try get one client by Ctdor Id.' });
        }
    });
}
exports.getContbyNumberCtrl = getContbyNumberCtrl;
function getContainerOneCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const container = yield (0, containerService_1.getContainerOneServ)(new mongodb_1.ObjectID(id));
            res.json(container);
        }
        catch (error) {
            res.status(500).json({ status: 500, message: 'Failed to try get one container from database' });
        }
    });
}
exports.getContainerOneCtrl = getContainerOneCtrl;
function createContainerCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //        const { id, price, client, active } = req.body;
            const { id_container, price_tocharge, rented_by, active } = req.body;
            console.log(req.body);
            const container = new Container_1.default({
                id_container,
                price_tocharge,
                rented_by,
                active
            });
            yield (0, containerService_1.createContainerServ)(container);
            res.json(container);
        }
        catch (error) {
            res.status(500).json({ status: 500, message: 'Failed to create the container!' });
        }
    });
}
exports.createContainerCtrl = createContainerCtrl;
function insertContainersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const TOTALCONT: number= 33;
        const { number } = req.params;
        try {
            const container = new Container_1.default({
                id_container: parseInt(number),
                price_tocharge: 0,
                rented_by: '',
                active: false
            });
            yield (0, containerService_1.createContainerServ)(container);
            res.json(container);
        }
        catch (error) {
        }
    });
}
exports.insertContainersController = insertContainersController;
function updateContainerCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         *  PUT method, containers/:id
         */
        try {
            const { id } = req.params;
            const container = yield (0, containerService_1.updateContainerServ)(new mongodb_1.ObjectID(id), req.body);
            console.log(container);
            res.json(container);
        }
        catch (error) {
            res.status(500).json({ status: 500, message: 'Failed to try update one container...' });
        }
    });
}
exports.updateContainerCtrl = updateContainerCtrl;
function deleteContainerCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const container = yield (0, containerService_1.deleteContainerServ)(new mongodb_1.ObjectID(id));
            res.json(container);
        }
        catch (error) {
            res.status(510).json({ status: 510, messsage: 'Failed to try delete one exists container' });
        }
    });
}
exports.deleteContainerCtrl = deleteContainerCtrl;
/**
 * Code tsc written for author: ehermza Date: 09.agost/2021
 */
