const connectionPool = require('../db/dbConnection');
const commentQuery = require('../db/queries/query.comment')
const { selectQueryToList, queryToAffectedRow } = require('../utils/queryHandler')

class CommentController {

    async getCommentList (query) {
      const { id } = query
      const connection = await connectionPool.getConnection()
      try {
        const result = selectQueryToList(connection, commentQuery.getCommentList, [id])
        return result
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }

    async postComment (body) {
      const { boardId, contents, writer, password, refId, userId } = body
      const connection = await connectionPool.getConnection()
      try {
        const result = await queryToAffectedRow(connection, commentQuery.postComment, [
          boardId, 
          contents, 
          writer, 
          password, 
          refId, 
          userId
        ])
        return result == 1
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }

    async deleteComment (body) {
      const { id } = body
      const connection = await connectionPool.getConnection()
      try {
        const result = await queryToAffectedRow(connection, commentQuery.deletComment, [id])
        return result == 1
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }

    async putComment (body) {
      const { categoryItemId, title, password, contents, id } = body
      const connection = await connectionPool.getConnection()
      try {
        const result = await queryToAffectedRow(connection, commentQuery.putComment, [categoryItemId, title, password, contents, id])
        return result == 1
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }

    async postLike (body) {
      const { commentId, userId } = body
      console.log(body)
      const connection = await connectionPool.getConnection()
      try {
        let updateLikeCount = 0
        const postLikeLog = await queryToAffectedRow(connection, commentQuery.postLike, [commentId, userId])
        if(postLikeLog == 1) {
          updateLikeCount = await queryToAffectedRow(connection, commentQuery.updateLikeCount, [commentId, commentId])
        }
        return updateLikeCount == 1
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }
}

module.exports = new CommentController();