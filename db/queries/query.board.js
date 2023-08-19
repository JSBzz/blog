module.exports = {
    getBoard : `
        SELECT * FROM board
        WHERE ID = ?
    `,
    postBoard : `
        INSERT INTO board
        (category_item_id, title, password, user_id, contents, writer, is_member)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?)
    `,
    putBoard : `
        UPDATE board
        SET category_item_id = ?,
            title = ?,
            password = ?,
            contents = ?
        WHERE id = ?
    `,
    deletBoard : `
        DELETE FROM board
        WHERE id = ?
    `
}