import { ICustomExpressRequest, ICustomExpressResponse } from '../types/router.types'
import { NextFunction } from 'express'

export default async function (req: ICustomExpressRequest, res: ICustomExpressResponse, next: NextFunction) {
    res.response.addError('api', 'Not Found')
    return res.respond(false)
}
