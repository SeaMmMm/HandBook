const express = require('express')
const app = express()
let Mock = require('mockjs')

let ListApi = require('./data/list')
app.get('/api/article/list', function(req, res) {
    res.json(
        Mock.mock(
            ListApi.getList(req)
        )
    )
})

app.listen(3000)