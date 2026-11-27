import logger from "../../pkg/logger/logger";
import {Request,Response,NextFunction} from "express";
import {AppError} from "../../pkg/error/error"

export async function globalErrorHandler(error:AppError, req:Request, res:Response, _next:NextFunction) {

    logger.error({
        error: error,
        stack: error.stack,
        //correlationId: req.correlationId,
    })

    if (error.isOperationError) {
        return res.status(error.statusCode || 400).json({
            message: error.message,
            success: false,
        });
    }

    return res.status(500).json({
        message: 'Something went wrong',
        success: false,
    });
}
