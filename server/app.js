var express = require('express');
var path = require('path');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnection = require('./database/db');

//MongoDB connection
dbConnection.connectDb();

var indexRouter = require('./routes/index');
var currencyRouter = require('./routes/currency.routes');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/currency', currencyRouter);

app.use(errorHandler);

/**
 * Error handler 
 * @param {*} error 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function errorHandler(error, req, res, next) {
    if (error) {
        obj = {
            errors: {
                message: error.message
            }
        }
        res.send(obj);
    } else {
        res.sendStatus(httpResponseCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = app;
