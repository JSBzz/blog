const boardService = require("../services/service.board")

class BoardController {
    async getBoard (req, res, next) {
        const result = await boardService.getBoard(req.query)
        res.send(result)
    }

    async postBoard (req, res, next) {
        res.send('this is post')
    }

    async deleteBoard (req, res, next) {
        res.send('this is delete')
    }

    async putBoard (req, res, next) {
        res.send('this is put')
    }
}

module.exports = new BoardController();