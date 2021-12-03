"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = require("../controllers/clientController");
class Client {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    ;
    routes() {
        this.router.get('/', clientController_1.getClientsCtrl);
        this.router.get('/:id', clientController_1.getClientOneCtrl);
        this.router.post('/', clientController_1.createClientCtrl);
        this.router.put('/:id', clientController_1.updateClientCtrl);
        // this.router.post('/update/:id', updateClientCtrl);
    }
}
;
const client = new Client();
exports.default = client.router;
