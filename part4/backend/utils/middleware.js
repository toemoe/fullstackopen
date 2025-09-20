const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      request.user = decodedToken
      next()
    } catch { return response.status(401).json({ error: 'token invalid' }) }
  } else {
    return response.status(401).json({ error: 'token missing' })
  }
}

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'token missing' })
  }
  const token = authorization.replace('Bearer ', '')
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(401).json({ error: 'user not found' })
    }

    request.user = user
    next()
  } catch { return response.status(401).json({ error: 'token invalid' }) }
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected username to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }
  next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor }