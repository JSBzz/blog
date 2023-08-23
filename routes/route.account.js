var express = require('express')
var router = express.Router();
const accountController = require('../controllers/controller.account')
const passport = require('passport');

router.route('/')
      .get(accountController.getAccount)
      .post(accountController.postAccount)
      .put(accountController.putAccount)
      .delete(accountController.deleteAccount)

router.get('/login/:provider', passport.authenticate('google', { scope: ['email'] }))

module.exports = router