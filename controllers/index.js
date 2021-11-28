const userAuthController = require('./auth/user_auth');
const volunteerAuthController = require('./auth/volunteer_auth');
const userController = require('./user_controller');
const disposeRequestController = require('./dispose_request_controller');
const priceController = require('./price_controller');

module.exports = { 
    userAuthController, 
    volunteerAuthController,
    userController,
    disposeRequestController,
    priceController
};