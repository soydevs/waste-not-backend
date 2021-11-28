const express = require('express');
const { userController } = require('../controllers');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.status(200).send(req.user)
});

router.patch('/', async (req, res) => {
  const { code, ...data } = await userController.updateUser(req.user._id, req.body.user)
  res.status(code).send(data)
})

module.exports = router;
