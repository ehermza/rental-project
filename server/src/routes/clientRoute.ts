import { Router } from "express";

import {
    getClientsCtrl,
    getClientOneCtrl,
    createClientCtrl,
    updateClientCtrl
} from "../controllers/clientController";

class Client {
    public router;
    constructor() {
        this.router = Router();
        this.routes();
    };

    routes() {
        this.router.get('/', getClientsCtrl);       // it Works! Jan.30th,2022
        this.router.get('/:id', getClientOneCtrl);  // it Works! Jan.30th,2022
        this.router.post('/', createClientCtrl);
        this.router.put('/:id', updateClientCtrl);
        // this.router.post('/update/:id', updateClientCtrl);

    }
};

const client = new Client();

export default client.router;
