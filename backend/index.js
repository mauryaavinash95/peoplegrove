const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { router } = require('./apis/v1/index.js');

let app = new express();
app.use(cors());
// app.all('/*', (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/apis/v1/', router);

app.use(function (req, res) {
    if (!res.locals.result)
        res.status(404).json('Page not found');
    else {
        res.send({
            code: 200,
            result: res.locals.result,
        });
    }
})

app.use(function (err, req, res, next) {
    err = err.message || err.msg || err;
    if (err.isBoom) {
        return res.status(err.output.statusCode).json(err.output.payload);
    } else {
        res.status(200).send({
            code: err.statusCode || 400,
            result: err,
        });
    }
});

module.exports = app;