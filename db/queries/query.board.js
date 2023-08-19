module.exports = {
    getBoard : `
        SELECT * FROM board
        WHERE ID = ?
    `
}