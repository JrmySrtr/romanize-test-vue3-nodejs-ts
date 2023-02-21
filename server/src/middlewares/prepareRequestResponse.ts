import { NextFunction } from 'express'
import { ICustomExpressRequest, ICustomExpressResponse } from '../types/router.types'

export default async function (req: ICustomExpressRequest, res: ICustomExpressResponse, next: NextFunction) {

    res.response = {
        object: {
            status: null,
            data: null,
            errors: {}
        },
        addError(index: string, msg: string = null): void {
            if (!index) index = 'api'
            if (!msg) {
                msg = index
                index = 'api'
            }
            if (!this.object.errors[index]) this.object.errors[index] = []
            this.object.errors[index].push(msg)
        },
        getErrors(): object {
            return this.object.errors
        },
        countErrors(): boolean {
            return !!Object.keys(this.object.errors).length
        }
    }

    res.error = (index: string, msg: string = null) => {
        res.response.addError(index, msg); 
        res.respond(403, false)
    }

    res.respond = (status: number | boolean, data: any): void => {
        if (typeof status === 'boolean') status = 403
        if (res.response.countErrors()) {
            res.response.object.status = 403
            res.response.object.data = false
        } else {
            res.response.object.status = status || 200
            res.response.object.data = data || false
        }
        res.status(res.response.object.status)
        res.json(res.response.object)
        res.end()
    }

    next()
}
