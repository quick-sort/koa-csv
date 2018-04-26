const assert = require('assert')
const request = require('supertest')
const csv2json = require('../csv2json')
const serve = require('..')
const Koa = require('koa')
const rowResult = [{
    Name: 'name',
    Value: 'value'
}]
const colResult = {
    Name: ['name'],
    Value: ['value']
}

describe('test csv2json', () => {
    it('default', async () => {
        let result = await csv2json('test/fixture/test.csv')
        assert.equal(JSON.stringify(result), JSON.stringify(rowResult))
    })

    it('col', async () => {
        let result = await csv2json('test/fixture/test.csv', {axis: 'col'})
        assert.equal(JSON.stringify(result), JSON.stringify(colResult))
    })
})

describe('test koa-csv', () => {
    it('row json', (done) => {
        const app = new Koa()
        app.use(serve('test/fixture'))
        request(app.listen())
            .get('/test')
            .expect(200, JSON.stringify(rowResult), done)
    })
    it('col json', (done) => {
        const app = new Koa()
        app.use(serve('test/fixture'))
        request(app.listen())
            .get('/test?axis=col')
            .expect(200, JSON.stringify(colResult), done)
    })

    it('prefix col json', (done) => {
        const app = new Koa()
        app.use(serve('test/fixture', {prefix: '/csv'}))
        request(app.listen())
            .get('/csv/test?axis=col')
            .expect(200, JSON.stringify(colResult), done)
    })

    it('404', (done) => {
        const app = new Koa()
        app.use(serve('test/fixture'))
        request(app.listen())
            .get('/notexist')
            .expect(404, done)
    })

    it('change root', (done) => {
        const app = new Koa()
        app.use(serve('test/fixture', {prefix: '/csv'}))
        request(app.listen())
            .get('/csv/./../unaccessible')
            .expect(404, done)
    })
})
