# koa-csv

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

CSV files serving as json API middleware for koa

## Usage Example
```js
const Koa = require('koa')
const app = new Koa()
app.use(require('koa-csv')(root, opts))
```

* `root` root directory string
* `opts` option object


## Request Example 
for `test.csv` like this

Name|Value
----|-----
name|value

```
GET /test.csv
```
```json
[{
    "Name": "name",
    "Value": "value"
}]
```

```
GET /test.csv?axis=col
```
```json
{
    "Name": ["name"],
    "Value": ["value"]
}
```



## Options
- `trim` whether or not trim each cell, default `true`
- `axis` default is `row`, csv will be converted to an array of objects representing each line in csv, if `axis` is `col`, csv will be converted to an object, each property representing column in csv
- `delimiter` csv delimiter, default `,`
- `prefix` set the prefix of request path to match
- `lsdir` enable lsdir if path is a dir, default false

## TODO
- gzip support

[npm-image]: https://img.shields.io/npm/v/koa-csv.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-csv
[github-tag]: http://img.shields.io/github/tag/koajs/csv.svg?style=flat-square
[github-url]: https://github.com/quick-sort/koa-csv/tags
[travis-image]: https://img.shields.io/travis/quick-sort/koa-csv.svg?style=flat-square
[travis-url]: https://travis-ci.org/quick-sort/koa-csv
[coveralls-image]: https://img.shields.io/coveralls/quick-sort/koa-csv.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/quick-sort/koa-csv?branch=master
[license-image]: http://img.shields.io/npm/l/koa-csv.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/koa-csv.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/koa-csv
