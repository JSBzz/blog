
exports.selectQueryToList = async (connection, query, values) => {
    const formattingQuery = connection.format(query, values)
    const [result] = await connection.query(formattingQuery)
    return result
}

exports.selectQueryToJson = async (connection, query, values) => {
    const formattingQuery = connection.format(query, values)
    const [result] = await connection.query(formattingQuery)
    return result[0]
}

exports.queryToAffectedRow = async (connection, query, values) => {
    const [postResult] = await connection.query(query, values);
    return postResult.affectedRows;
}