const express = require('express');
const verifyUserToken = require('../middlewares/verify_user_token');
const userRouter = require('./user_routes');
const authRouter = require('./auth_routes');
const disposeRouter = require('./dispose_routes');
const priceRouter = require('./price_routes');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/auth', authRouter);
router.use('/users', verifyUserToken, userRouter);
router.use('/dispose', verifyUserToken, disposeRouter);
router.use('/prices', priceRouter);

module.exports = router;
