export class AppError extends Error {
    statusCode;
    isOperationError;

    constructor(message:string, statusCode:number, isOperationError = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperationError = isOperationError
        Error.captureStackTrace(this, this.constructor);
    }

}
