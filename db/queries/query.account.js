module.exports = {
    getAccount : `
        SELECT * FROM user
        WHERE user_id = ?
    `,
    postAccount : `
        INSERT INTO user
        (user_id, id, password, profile_image, introduction, platform, nickname)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?)
    `,
    putAccount : `
        UPDATE user
        SET profile_image = ?,
            introduction = ?,
            nickname = ?
        WHERE user_id = ?
    `,
    deletAccount : `
        DELETE FROM user
        WHERE user_id = ?
    `
}