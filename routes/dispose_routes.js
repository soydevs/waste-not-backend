var express = require('express');
const { disposeRequestController } = require('../controllers');
const router = express.Router();
var uuid = require('uuid')

router.get('/', async (req, res) => {
    const { code, ...data } = await disposeRequestController.getRequests(req.user._id)
    res.status(code).send(data)
});

router.post('/', async (req, res) => {
    req.body.user = req.user._id;
    req.body.uid = uuid.v4()
    const { code, ...data } = await disposeRequestController.createRequest(req.body)
    res.status(code).send(data)
});

module.exports = router