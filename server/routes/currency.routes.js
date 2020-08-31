var express = require('express');
var router = express.Router();

var currencyController = require('../controllers/currency.controller');

/** Todo Routes */

/**Get Todo List */
router.get('/', currencyController.getAllCurrency);


/**Update Currency Rates  */
router.put('/', currencyController.updateCurrencyRates);


module.exports = router;
