const logger = require('../utils/logger.js')

const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  if (req.body.likes === undefined)
    req.body.likes = 0
  
  const blog = new Blog(req.body)
  const result = await blog.save()
  res.status(201).json(result)
})

module.exports = blogsRouter