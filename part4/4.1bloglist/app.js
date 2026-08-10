const express = require('express')
const mongoose = require('mongoose')
const process = require('node:process')

const logger = require('./utils/logger.js')
const config = require('./utils/config.js')
const blogsRouter = require('./controllers/blogs.js')
const Blog = require('./models/blog.js')

const app = express()

app.use(express.json())

const mongoUrl = process.env.NODE_ENV === 'test' ? config.TEST_MONGODB_URI : config.MONGODB_URI 
logger.info('Connecting to MongoDB url...', mongoUrl)

mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() =>
    logger.info('connected to MongoDB'))
  .catch(error =>
    logger.error('Failed to connect to database',)
  )


app.use('/api/blogs', blogsRouter)

module.exports = app