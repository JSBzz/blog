var express = require('express')
var router = express.Router();
const commentController = require('../controllers/controller.comment')

router.route('/')
      .get(commentController.getCommentList)
      .post(commentController.postComment)
      .put(commentController.putComment)
      .delete(commentController.deleteComment)

router.post('/like', commentController.postLike)

module.exports = router