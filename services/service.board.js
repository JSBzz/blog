const connectionPool = require('../db/dbConnection');
const boardQuery = require('../db/queries/query.board')
const { selectQueryToList, queryToAffectedRow, selectQueryToJson } = require('../utils/queryHandler')

class BoardService {

    async getBoard (query) {
      const { id } = query
      const connection = await connectionPool.getConnection()
      try {
        const result = selectQueryToJson(connection, boardQuery.getBoard, [id])
        return result
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }

    async getBlogBoardList (query) {
      const { userId } = query
      const connection = await connectionPool.getConnection()
      try {
        const result = await selectQueryToList(connection, boardQuery.getBlogBoardList, [userId])
        return result
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }

    async postBoard (body) {
      const { categoryItemId, title, password, contents, userId, writer } = body
      const connection = await connectionPool.getConnection()
      try {
        const result = await queryToAffectedRow(connection, boardQuery.postBoard, [
          categoryItemId, 
          title, 
          password, 
          userId, 
          contents, 
          writer
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

    async postLike (body) {
      const { boardId, userId } = body
      console.log(body)
      const connection = await connectionPool.getConnection()
      try {
        let updateLikeCount = 0
        const postLikeLog = await queryToAffectedRow(connection, boardQuery.postLike, [boardId, userId])
        console.log(postLikeLog)
        if(postLikeLog == 1) {
          updateLikeCount = await queryToAffectedRow(connection, boardQuery.updateLikeCount, [boardId, boardId])
        }
        return updateLikeCount == 1
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }
}

module.exports = new BoardService();