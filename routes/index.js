import express from 'express';
import app from '../app';
import verifyUserToken from '../middlewares/verify_user_token';
import userRouter from './user_routes';
import authRouter from './auth_routes';

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.use('/auth', authRouter);
app.use('/users', verifyUserToken, userRouter);

module.exports = router;
