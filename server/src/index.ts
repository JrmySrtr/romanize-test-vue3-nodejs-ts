'use strict'
import { env } from './common'
import { createServer as createServerHTTP } from 'http'
import express from 'express'
import expressUserAgent from 'express-useragent'
import middlewarePrepareHeader from './middlewares/prepareHeader'
import middlewarePrepareRequestResponse from './middlewares/prepareRequestResponse'
import middlewareNotFoundHandler from './middlewares/notFoundHandler'
import RouterPublicWebRoman from './routes/public/roman.web.router'
// import RouterUserMobileProtected from './routes/protected/user.mobile.router'
// import RouterConversationMobileProtected from './routes/protected/conversation.mobile.router'
// **********************
// HTTP Server Creation
// **********************

const server = express()
server.set('trust proxy', true)
server.use(express.json())
server.use(express.urlencoded())
server.use(expressUserAgent.express())
server.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})
server.use((req, res, next) => {
    console.log(req.url)
    next()
})
server.use(middlewarePrepareHeader)
server.use(middlewarePrepareRequestResponse)
server.use(RouterPublicWebRoman)
server.use(middlewareNotFoundHandler)

// **********************
// HTTP/S SERVER CREATION
// **********************
// httpSocketServer = createServerHTTPS({
//     cert: '',
//     key: '',
// })
const httpServer = createServerHTTP()


// **********************
// Handling request by express
// **********************
httpServer.on('request', server)


// **********************
// Exports
// **********************

export const serverHTTP = httpServer
