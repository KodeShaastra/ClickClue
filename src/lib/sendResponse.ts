import { Response } from "express"

// Sends every success reply in the same shape: { success, message, data }
export const sendResponse = (
    res: Response,
    statusCode: number,
    message: string,
    data?: unknown
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    })
}
