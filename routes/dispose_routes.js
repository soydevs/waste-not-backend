var express = require('express');
const { disposeRequestController } = require('../controllers');
const router = express.Router();
var uuid = require('uuid');
const verifyUserToken = require('../middlewares/verify_user_token');
const verifyVolunteerToken = require('../middlewares/verify_volunteer_token');

router.get('/', verifyUserToken, async (req, res) => {
    const { code, ...data } = await disposeRequestController.getRequests(req.user._id)
    res.status(code).send(data)
});

router.post('/', verifyUserToken, async (req, res) => {
    req.body.user = req.user._id;
    req.body.uid = uuid.v4()
    const { code, ...data } = await disposeRequestController.createRequest(req.body)
    res.status(code).send(data)
});

router.get('/volunteer', async(req,res)=>{
    const { code, ...data } = await disposeRequestController.getRequests()
    res.status(code).send(data)
})

router.get('/volunteer/claims', verifyVolunteerToken, async(req,res)=>{
    const { code, ...data } = await disposeRequestController.getVolunteerClaims(req.volunteer)
    res.status(code).send(data)
})

router.post('/volunteer', verifyVolunteerToken, async(req, res)=>{
    req.body.data.volunteer = req.volunteer;
    const { code, ...data } = await disposeRequestController.handleRequest(req.body.data)
    res.status(code).send(data)
})

module.exports = router