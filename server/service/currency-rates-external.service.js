const rp = require('request-promise');
const config = require('../config');
const currencyModel = require('../models/currency.model');
const currencyHelper = require('../service/currency-rates-external.service');


module.exports = {
    /**
     * Get Currency Rate by Base Currency
     */
    getCurrencyRatesByBaseCurrnecy: (base) => {

        var options = {
            uri: `${config.CURRENCY_URL}/latest?base=${base}`,
            json: true
        };

        return rp(options)
    },

    /**
     * Update Currency Rates
     */
    updateCurrencyRates: (from, to) => {
        var options = {
            uri: `${config.CURRENCY_URL}/latest?symbols=${from},${to}&&base=${from}`,
            json: true
        };

        return rp(options)

    },

    createMockData: () => {

        let promises = [];
        currency = [
            { code: 'INR', name: 'Indian Rupee' },
            { code: 'AUD', name: 'Australian Dollar' },
            { code: 'CAD', name: 'Canadian Dollar' },
            { code: 'JPY', name: 'Japanese Yen' }
        ];


        for (let i = 0; i < currency.length; i++) {
            var options = {
                uri: `${config.CURRENCY_URL}/latest?base=${currency[i].code}`,
                json: true
            };
            rp(options)
            promises.push(rp(options));
        }

        Promise.all(promises).then((data) => {
            let dataArray = [];

            for (let i = 0; i < data.length; i++) {
                let obj = {};
                let ratesObj = {
                    INR: data[i].rates.INR,
                    AUD: data[i].rates.AUD,
                    CAD: data[i].rates.CAD,
                    JPY: data[i].rates.JPY
                };

                obj = {
                    name: currency[i].name,
                    code: currency[i].code,
                    rates: ratesObj
                }
                dataArray.push(obj);
            }
            currencyModel.insertMany(dataArray, (err, data) => {
                if (err) {
                    console.log("Error", err);
                }
                console.log("Data", data);
            })
        });

    }
}