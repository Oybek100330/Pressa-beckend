const { ServerError } = require('./utils/error.js')
const { PORT } = require('../config.js')
const express = require('express')
const app = express()

const modelMiddleware = require('./middlewares/model.js')


app.use(modelMiddleware)

app.use(express.json())

const postRouter = require('./routes/post.js')

app.use('/posts', postRouter)


app.use((error, req, res, next) => {
	if([400, 401, 404, 413, 415].includes(error.status)) {
		return res.status(error.status).send(error)
	} 
	// logger
	return res.status(500).send(new ServerError(""))
})



app.listen(PORT, () => console.log('server is running on http://localhost:' + PORT))