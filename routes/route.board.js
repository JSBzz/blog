var express = require('express')
var router = express.Router();
const boardController = require('../controllers/controller.board')

router.route('/:id/:title')
      .get(boardController.getBoard)
      .post(boardController.postBoard)
      .put(boardController.putBoard)
      .delete(boardController.deleteBoard)

module.exports = router