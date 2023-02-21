import { Request, Response, NextFunction } from 'express'
import { ALLOWED_ORIGINS } from '../config'

export default function (req: Request, res: Response, next: NextFunction) {

    if (ALLOWED_ORIGINS.includes(req.headers.origin)) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Expose-Headers', 'x-events')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'x-events,X-Requested-With,content-type,authorization,bearer'
    )
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    next()
}
