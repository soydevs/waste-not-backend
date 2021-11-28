const express = require('express');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.status(200).send(req.volunteer)
});


module.exports = router;
