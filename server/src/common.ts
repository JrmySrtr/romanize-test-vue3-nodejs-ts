// tslint:disable-next-line:no-var-requires
require('dotenv').config({
    path: `${__dirname}/../.env/${process.env.NODE_ENV || 'local'}.env`
})

export const env = (key: string) => {
    return process.env[key]
}
