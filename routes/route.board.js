var express = require('express')
var router = express.Router();
const boardController = require('../controllers/controller.board')

router.route('/')
      .get(boardController.getBoard)
      .post(boardController.postBoard)
      .put(boardController.putBoard)
      .delete(boardController.deleteBoard)

router.get('/list', boardController.getBlogBoardList)

router.post('/like', boardController.postLike)

module.exports = router