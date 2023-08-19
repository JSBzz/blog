const connectionPool = require('../db/dbConnection');
const boardQuery = require('../db/queries/query.board')

class BoardService {

    async getBoard (query) {
      const { id } = query
      const connection = await connectionPool.getConnection()
      try {
        const sql = connection.format(boardQuery.getBoard, [id])
        const [result] = await connection.query(sql)
        return result
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
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

module.exports = new BoardService();