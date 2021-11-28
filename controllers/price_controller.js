const { Price } = require('../models');

const getPrices = async (_id, data) => {
    try {
        const prices = await Price.find();
        return { "success":true, "message":"success!", prices, "code":200 }
    } 
    catch(e) {
        console.log(e);
    }

    return { "success":false, "message":"failed!", "code":500 }
}

const priceController = { getPrices };
module.exports = priceController;