const connectionPool = require('../db/dbConnection');
const accountQuery = require('../db/queries/query.account')
const { selectQueryToList, queryToAffectedRow, selectQueryToJson } = require('../utils/queryHandler')
const { makeUniqueId } = require('../utils/uuidCreater')

class AccountService {

    async getAccount (query) {
      const { userId } = query
      const connection = await connectionPool.getConnection()
      try {
        const result = selectQueryToJson(connection, accountQuery.getAccount, [userId])
        return result
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }

    async postAccount (body) {
      const { id, password, profieImage, introduction, platform, nickName } = body
      const user_id = makeUniqueId(10)
      const connection = await connectionPool.getConnection()
      try {
        const result = await queryToAffectedRow(connection, accountQuery.postAccount, [
          user_id,
          id, 
          password, 
          profieImage, 
          introduction, 
          platform, 
          nickName
        ])
        return result == 1
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }

    async deleteAccount (body) {
      const { userId } = body
      const connection = await connectionPool.getConnection()
      try {
        const result = await queryToAffectedRow(connection, accountQuery.deletAccount, [userId])
        return result == 1
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }

    async putAccount (body) {
      const { profieImage, introduction, nickName, userId } = body
      const connection = await connectionPool.getConnection()
      try {
        const result = await queryToAffectedRow(connection, accountQuery.putAccount, [profieImage, introduction, nickName, userId])
        return result == 1
      } catch(error) {
        console.log(error)
      } finally {
        connection.release()
      }
    }
}

module.exports = new AccountService();