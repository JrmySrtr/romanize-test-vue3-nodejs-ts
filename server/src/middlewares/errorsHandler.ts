import { ICustomExpressRequest, ICustomExpressResponse } from '../types/router.types'
import { NextFunction } from 'express'

interface ICustomSyntaxError extends SyntaxError {
    status?: number
    message: string
}

export default async function (
    err: ICustomSyntaxError,
    req: ICustomExpressRequest,
    res: ICustomExpressResponse,
    next: NextFunction
) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.response.addError('api', 'Internal Error :' + err.message)
        return res.respond(false)
    } else {
        next()
    } 
}
