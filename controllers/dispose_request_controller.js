const { DisposeRequest, Price } = require('../models');

const createRequest = async (req) => {
    try {
        const item = await Price.findOne({ 'item': req.type }).lean().exec();
        if(!item)
            return { "success":false, "message":"Bad Request", "code":400 }
        req.price = item.price;
        const newRequest = new DisposeRequest(req);
        await newRequest.save();
        return { "success":true, "message":"creation success!", "req":newRequest, "code":201 }
    } catch (e) {
        console.log(e)
    }
    return { "success":false, "message":"creation failed!", "code":500 }
}

const getRequests = async (user) => {
    try {
        const requests = await DisposeRequest.find({user}).lean().exec();
        return { "success":true, "message":"success!", requests, "code":200 }
    } catch (e) {
        console.log(e)
    }
    return { "success":false, "message":"failed!", "code":500 }
}

const disposeRequestController = { createRequest, getRequests }
module.exports = disposeRequestController;