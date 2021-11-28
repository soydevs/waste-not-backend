const express = require('express');
const { userAuthController, volunteerAuthController } = require('../controllers');

var router = express.Router()

router.post('/user/signup', async (req, res) => {
    const { code, ...data } = await userAuthController.registerUser(req.body)
    res.status(code).send(data)
});

router.post('/user/login', async(req, res) => {
    const { code, ...data } = await userAuthController.loginUser(req.body)
    res.status(code).send(data)
})

router.post('/volunteer/signup', async (req, res) => {
    const { code, ...data } = await volunteerAuthController.registerVolunteer(req.body)
    res.status(code).send(data)
});

router.post('/volunteer/login', async(req, res) => {
    const { code, ...data } = await volunteerAuthController.loginVolunteer(req.body)
    res.status(code).send(data)
})

module.exports = router;