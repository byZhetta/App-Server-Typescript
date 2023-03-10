import "reflect-metadata";
import express  from "express";
import morgan from "morgan";
import cors from "cors";
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";
import { LoginStrategy } from "./auth/strategies/login.strategy";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";
const { UserRouter, 
        PurchaseRouter, 
        ProductRouter, 
        CustomerRouter,
        CategoryRouter,
        PurchaseProductRouter,
        AuthRouter } = require("./routes/index");

class ServerBootstrap extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv("PORT");

    constructor () {
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.passportUse();
        this.dbConnect();
        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.use('/api', this.routers());
        this.listen();
    }

    routers(): Array<express.Router> {
        return [
            new UserRouter().router,
            new PurchaseRouter().router,
            new ProductRouter().router,
            new CustomerRouter().router,
            new CategoryRouter().router,
            new PurchaseProductRouter().router,
            new AuthRouter().router,
        ];
    }

    passportUse() {
        return [new LoginStrategy().use, new JwtStrategy().use];
    }

    async dbConnect(): Promise<DataSource | void> {
        return this.initConnect
        .then(() => {console.log("Connect Success");})
        .catch((err) => {console.log(err);});
    }
    
    public listen() {
        this.app.listen(this.port, () => {
            console.log("Server listening on port: " + this.port);
        });
    }
}

new ServerBootstrap();