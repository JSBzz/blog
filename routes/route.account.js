var express = require('express')
var router = express.Router();
const accountController = require('../controllers/controller.account')

router.route('/')
      .get(accountController.getAccount)
      .post(accountController.postAccount)
      .put(accountController.putAccount)
      .delete(accountController.deleteAccount)

module.exports = router