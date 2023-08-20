const commentService = require("../services/service.comment")

class CommentController {
    async getCommentList (req, res, next) {
        const result = await commentService.getCommentList(req.query)
        res.send(result)
    }

    async postComment (req, res, next) {
        const result = await commentService.postComment(req.body)
        res.send(result)
    }

    async deleteComment (req, res, next) {
        const result = await commentService.deleteComment(req.body)
        res.send(result)
    }

    async putComment (req, res, next) {
        const result = await commentService.putComment(req.body)
        res.send(result)
    }

    async postLike (req, res, next) {
        const result = await commentService.postLike(req.body)
        res.send(result)
    }
}

module.exports = new CommentController();