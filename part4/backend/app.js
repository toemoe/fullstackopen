const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const cors = require('cors')
const app = express()
app.use(cors())

const mongoURL = process.env.NODE_ENV === 'test' ? config.TEST_MONGODB_URI : config.MONGODB_URI
logger.info('connecting to', config.MONGODB_URI)

mongoose.set('strictQuery', false)
mongoose
  .connect(mongoURL)
  .then(() => { logger.info('connected to MongoDB') })
  .catch((error) => { logger.error('error connecting to MongoDB:', error.message) })

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.tokenExtractor)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app