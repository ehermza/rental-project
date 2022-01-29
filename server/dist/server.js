"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const containerRoute_1 = __importDefault(require("./routes/containerRoute"));
const clientRoute_1 = __importDefault(require("./routes/clientRoute"));
const rentalRoute_1 = __importDefault(require("./routes/rentalRoute"));
const periodRoute_1 = __importDefault(require("./routes/periodRoute"));
// import pagoRoutes from "./routes/pagoRoute";
// import debtInfoRoute from "./routes/debtInfoRoute";
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        //connection mongodb atlas
        mongoose_1.default.connect('mongodb://localhost/containers', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
            .then(db => console.log('Db is connected.'))
            .catch(err => console.log(err));
        //Settings
        this.app.set("port", process.env.PORT || 5300);
        //Middlewares
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use(index_1.default);
        this.app.use("/api/period", periodRoute_1.default);
        this.app.use("/api/containers", containerRoute_1.default);
        this.app.use("/api/clients", clientRoute_1.default);
        // this.app.use("/api/pagos", pagoRoutes);
        this.app.use("/api/rental", rentalRoute_1.default);
        // this.app.use("/api/informe/", debtInfoRoute);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port:", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
