# koa-csv
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
GET /test
```
```json
[{
    "Name": "name",
    "Value": "value"
}]
```

```
GET /test?axis=col
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

## TODO
- gzip support

