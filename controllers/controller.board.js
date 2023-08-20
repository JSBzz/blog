const boardService = require("../services/service.board")

class BoardController {
    
    async getBoard (req, res, next) {
        const result = await boardService.getBoard(req.query)
        res.send(result)
    }

    async getBlogBoardList (req, res, next) {
        const result = await boardService.getBlogBoardList(req.query)
        res.send(result)
    }

    async postBoard (req, res, next) {
        const result = await boardService.postBoard(req.body)
        res.send(result)
    }

    async deleteBoard (req, res, next) {
        const result = await boardService.deleteBoard(req.body)
        res.send(result)
    }

    async putBoard (req, res, next) {
        const result = await boardService.putBoard(req.body)
        res.send(result)
    }

    async postLike (req, res, next) {
        const result = await boardService.postLike(req.body)
        res.send(result)
    }

}

module.exports = new BoardController();