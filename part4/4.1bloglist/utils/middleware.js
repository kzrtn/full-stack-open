const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method)
  logger.info('Path: ', req.path)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown enpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err)

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: `Username already taken: ${err.message}` })
  } else if (err.name === 'CastError') {
    return res.status(400).json({ error: `Malformatted id: ${err.message}`})
  }

  next(err)
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')

  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  } else {
    req.token = null
  }
  
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}