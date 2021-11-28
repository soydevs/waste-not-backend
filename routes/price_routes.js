const express = require('express');
const { priceController } = require('../controllers');

var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res) {
    const { code, ...data } = await priceController.getPrices()
    res.status(code).send(data)
});

module.exports = router;
