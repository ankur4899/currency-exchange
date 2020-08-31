const currencyModel = require('../models/currency.model');
const currencyHelper = require('../service/currency-rates-external.service');

module.exports = {

    /**
     * Function to update todos by id
     */
    updateCurrencyRates: async (req, res, next) => {
        const from = req.body.from;
        const to = req.body.to;


        let baseRate = await currencyHelper.updateCurrencyRates(from, to).catch((err) => next(err));


        if (baseRate) {
            let data = await currencyModel.findOne({ code: from }).catch((err) => next(err));
            let obj = {};
            if (data) {
                obj = { ...data.rates, ...baseRate.rates }
            }

            currencyModel.findOneAndUpdate({ code: from }, { rates: obj },
                {
                    projection: { rates: 1, _id: 0 },
                    returnNewDocument: true,

                }, (err, currencyData) => {
                    if (err) {
                        return next(err);
                    }
                    if (currencyData) {
                        res.json({ [from]: currencyData.rates[from], [to]: currencyData.rates[to] });
                    } else {
                        res.json({ message: `Currency with code ${id} does not exist` })
                    }
                    res.send();
                })
        }


    },

    /**
     * Function to get all currencies
     */
    getAllCurrency: (req, res, next) => {

        currencyModel.find({}, (err, data) => {
            if (err) {
                return next(err);
            }
            res.send(data);
        })
    },
}