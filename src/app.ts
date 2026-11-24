import express from 'express';
import './common/lib/db/connections'
import {globalErrorHandler} from "./common/lib/error/global.error.handler";
import {correlationId} from "./common/lib/correlation/correlationId";


export function createApp(){
    const app = express();
    app.use(express.json());
    app.use(correlationId);


    app.use(globalErrorHandler);

    return app;
}