"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const containerController_1 = require("../controllers/containerController");
class Container {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/', containerController_1.getContainersCtrl);
        this.router.get('/current-per', containerController_1.getCurrentPerController);
        this.router.get('/:id', containerController_1.getContainerOneCtrl);
        this.router.get('/number/:idctner', containerController_1.getContbyNumberCtrl);
        this.router.post('/', containerController_1.createContainerCtrl);
        this.router.put('/:id', containerController_1.updateContainerCtrl);
        this.router.delete('/:id', containerController_1.deleteContainerCtrl);
        // this.router.post('/create/:number', insertContainersController); deprecated!
    }
}
const container = new Container();
exports.default = container.router;
