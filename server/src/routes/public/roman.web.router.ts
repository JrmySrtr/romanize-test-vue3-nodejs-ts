import express from 'express'
import errorsHandler from '../../middlewares/errorsHandler';
import * as RomanControllers from '../../core/roman/controllers'
import { createEventSource } from '../../services/EventSource'

const Router = express.Router()
const SubRouter = express.Router()
SubRouter.use(express.json())

Router.use('/web/roman', SubRouter)
SubRouter.use(errorsHandler)
SubRouter.get('/ping', (req, res) => { res.send('pong') })
SubRouter.get('/event-source', createEventSource('roman'));
SubRouter.post('/convert', RomanControllers.webConverter)

export default Router
