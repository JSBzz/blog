const connectionPool = require('../db/dbConnection');
const boardQuery = require('../db/queries/query.board')
const { selectQueryToList, queryToAffectedRow } = require('../utils/queryHandler')

class BoardService {

    async getBoard (req) {
      const { id } = req.query
      const connection = await connectionPool.getConnection()
      try {
        const result = selectQueryToList(connection, boardQuery.getBoard, [id])
        return result
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }

    async postBoard (body) {
      const { categoryItemId, title, password, contents, user_id, writer, is_member } = body
      const connection = await connectionPool.getConnection()
      try {
        const result = await queryToAffectedRow(connection, boardQuery.postBoard, [
          categoryItemId, 
          title, 
          password, 
          user_id, 
          contents, 
          writer, 
          is_member
        ])
        return result == 1
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }

    async deleteBoard (body) {
      const { id } = body
      const connection = await connectionPool.getConnection()
      try {
        const result = await queryToAffectedRow(connection, boardQuery.deletBoard, [id])
        return result == 1
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }

    async putBoard (body) {
      const { categoryItemId, title, password, contents, id } = body
      const connection = await connectionPool.getConnection()
      try {
        const result = await queryToAffectedRow(connection, boardQuery.putBoard, [categoryItemId, title, password, contents, id])
        return result == 1
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }
}

module.exports = new BoardService();