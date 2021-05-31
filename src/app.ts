
import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { Routes } from './router/router';
class App {
    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost:27017/mongoose';

    constructor() {
        this.config();
        this.mongoSetup();

        dotenv.config();
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.routePrv.routes(this.app);

        this.app.use(errorHandler);
        this.app.use(notFoundHandler);
    }

    private mongoSetup() {
        // Connect to MongoDB
        mongoose.connect(this.mongoUrl, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log("Connected to Mongoose")
            // mongoose.connection.db.listCollections().toArray(function (err, names) {
            //     console.log(names); // [{ name: 'dbname.myCollection' }]
            //     module.exports.Collection = names;
            // });
        });
    }

    private config(): void {
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            // res.header("Access-Control-Allow-Credentials", "true");
            // res.header("Access-Control-Max-Age", "1800");
            next();
        });
        // this.app.use(express.static('public'));
    }
}

export default new App().app;
