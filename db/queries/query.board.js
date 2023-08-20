module.exports = {

    getBoard : `
        SELECT * FROM board
        WHERE ID = ?
    `,
    getBlogBoardList : `
        SELECT * FROM board
        WHERE owner_id = ?
    `,
    postBoard : `
        INSERT INTO board
        (category_item_id, title, password, user_id, contents, writer)
        VALUES 
        (?, ?, ?, ?, ?, ?)
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
        UPDATE board
        SET is_use = 0
        WHERE id = 1
    `,
    postLike : `
        INSERT INTO board_like_log
        (board_id, user_id)
        VALUES
        (?, ?)
    `,
    updateLikeCount : `
        UPDATE board
        SET like_count = (SELECT COUNT(*) FROM board_like_log WHERE board_id = ?)
        WHERE ID = ?
    `
    
}