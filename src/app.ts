import express from 'express';
import './lib/db/connections'
import {globalErrorHandler} from "./lib/error/global.error.handler";


export function createApp(){
    const app = express();
    app.use(express.json());
    app.use(globalErrorHandler);


    return app;
}