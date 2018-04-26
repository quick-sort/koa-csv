'use strict'
const CSV = require('csvtojson')
const createError = require('http-errors')
module.exports = csv2json
async function csv2json (file, options = {}) {
    return new Promise((resolve, reject) => {
        let data = null
        let delimiter = options.delimiter || ','
        let axis = options.axis || 'row'
        let trim = options.trim || true
        CSV({delimiter, trim})
            .fromFile(file)
            .on('json', obj => {
                if (axis === 'row') {
                    if (data === null) {
                        data = []
                    }
                    data.push(obj)
                } else {
                    if (data === null) {
                        data = {}
                    }
                    for (var col in obj) {
                        if (!(col in data)) {
                            data[col] = []
                        }
                        data[col].push(obj[col])
                    }
                }
            }).on('done', error => {
                if (error) {
                    let err = null
                    if (error.message === 'File not exists') {
                        err = createError(404, error)
                    } else {
                        err = createError(500, error)
                    }
                    reject(err)
                } else {
                    resolve(data)
                }
            })
    })
}
