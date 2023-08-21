const express = require('express')
const app = express()

// body parser
app.use(express.json())

// .env
require('dotenv').config();

const boardRouter = require('./routes/route.board')
app.use('/board', boardRouter)
const commentRouter = require('./routes/route.comment')
app.use('/comment', commentRouter)
const accountRouter = require('./routes/route.account')
app.use('/account', accountRouter)

app.listen(process.env.SERVER_STATUS == 'DEV' ? process.env.DEV_SERVER_PORT : process.env.PROD_SERVER_PORT)