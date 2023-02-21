import { Request, Response } from 'express'

export interface ICustomExpressRequest extends Request {
    files?: Express.Multer.File[]
    file?: Express.Multer.File
}

export interface ICustomExpressResponse extends Response {
    response: {
        object: {
            status: number
            data: string | false
            errors: {} | false
        }
        addError: (index: string, msg?: string) => void
        getErrors: () => object
        countErrors: () => boolean
    }
    error: (index: string, msg?: string) => void
    respond: (status: number | boolean, data?: any) => ICustomExpressResponse | void
}
