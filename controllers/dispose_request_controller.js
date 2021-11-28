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
        let requests;
        if(user)
            requests = await DisposeRequest.find({user, 'status':'pending'}).populate('user').lean().exec();
        else
            requests = await DisposeRequest.find({'status':'pending'}).populate('user').lean().exec();
        
        return { "success":true, "message":"success!", requests, "code":200 }
    } catch (e) {
        console.log(e)
    }
    return { "success":false, "message":"failed!", "code":500 }
}

const handleRequest = async(request) => {
    try {
        request.status = 'assigned';
        const newRequest = await DisposeRequest.findByIdAndUpdate(request._id, request, {new: true}).lean().exec()
        return { "success":true, "message":"success!", newRequest, "code":200 }
    } catch(e) {
        console.log(e);
    }
    return { "success":false, "message":"failed!", "code":500 }
}

const getVolunteerClaims = async(volunteer) => {
    try {
        
        let claims = await DisposeRequest.find({volunteer}).populate('user').lean().exec()
        
        return { "success":true, "message":"success!", claims, "code":200 }
    } catch(e) {
        console.log(e);
    }
    return { "success":false, "message":"failed!", "code":500 }
}

const disposeRequestController = { createRequest, getRequests, handleRequest, getVolunteerClaims }
module.exports = disposeRequestController;