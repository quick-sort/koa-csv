'use strict'
const debug = require('debug')('koa-csv')
const csv2json = require('./csv2json')
const path = require('path')
const createError = require('http-errors')
module.exports = serve
function serve (root, options) {
    let opts = Object.assign({}, options)
    let rootAbs = path.resolve(process.cwd(), root)
    debug('serving csv folder %s', rootAbs)
    return async function serve (ctx, next) {
        let done = false
        let prefix = opts.prefix || '/'
        if (prefix[0] !== '/') {
            prefix = '/' + prefix
        }
        if (ctx.method === 'HEAD' || ctx.method === 'GET') {
            if (prefix === ctx.path.substr(0, prefix.length)) {
                let ipath = ctx.path.substr(prefix.length)
                let file = path.join(rootAbs, ipath + '.csv')
                if (rootAbs === file.substr(0, rootAbs.length)) {
                    debug('serving %s.csv', ipath)
                    ctx.body = await csv2json(file, Object.assign({}, options, ctx.query))
                } else {
                    debug('cannot find %s.csv', ipath)
                    throw new createError.NotFound()
                }
                done = true
            }
        }
        if (!done) {
            await next()
        }
    }
}
