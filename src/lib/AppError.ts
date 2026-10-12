// An error we throw on purpose, with the HTTP status code to send back.
// Example: throw new AppError(404, "User not found")
export class AppError extends Error {
    public statusCode: number;
    public status : string;
    public isOperational: boolean;

    constructor(statusCode:number, message:string, isOperational:boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}
