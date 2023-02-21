import { env } from './common'
import { serverHTTP } from './index'

try {
    console.log('########################################')
    console.log('> \x1b[32mROMAN\x1b[0m API started.')
    console.log('> NODE Environment :\x1b[32m', process.env.NODE_ENV, '\x1b[0m')

    try {
        serverHTTP.listen({
            host: '0.0.0.0',
            port: env('PORT')
        })
    } catch (e) {
        console.log('> Server failed to start.')
    }
} catch (err) {
    console.log('Error', err)
    process.exit(1)
    throw err
}

module.exports = serverHTTP
