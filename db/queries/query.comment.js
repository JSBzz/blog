module.exports = {
    getCommentList : `
        SELECT * FROM comment
        WHERE board_id = ?
    `,
    postComment : `
        INSERT INTO comment
        (board_id, contents, writer, password, ref_id, user_id)
        VALUES 
        (?, ?, ?, ?, ?, ?)
    `,
    putComment : `
        UPDATE comment
        SET contents = ?,
            password = ?
        WHERE id = ?
    `,
    deletComment : `
        UPDATE comment
        SET is_use = 0
        WHERE id = ?
    `,
    postLike : `
        INSERT INTO comment_like_log
        (comment_id, user_id)
        VALUES
        (?, ?)
    `,
    updateLikeCount : `
        UPDATE comment
        SET like_count = (SELECT COUNT(*) FROM comment_like_log WHERE comment_id = ?)
        WHERE ID = ?
`
}