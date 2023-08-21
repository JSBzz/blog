const accountService = require("../services/service.account")

class AccountController {
    
    async getAccount (req, res, next) {
        const result = await accountService.getAccount(req.query)
        res.send(result)
    }

    async postAccount (req, res, next) {
        const result = await accountService.postAccount(req.body)
        res.send(result)
    }

    async deleteAccount (req, res, next) {
        const result = await accountService.deleteAccount(req.body)
        res.send(result)
    }

    async putAccount (req, res, next) {
        const result = await accountService.putAccount(req.body)
        res.send(result)
    }
}

module.exports = new AccountController();