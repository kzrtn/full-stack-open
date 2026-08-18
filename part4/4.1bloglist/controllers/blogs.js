const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const logger = require('../utils/logger.js')
const { userExtractor } = require('../utils/middleware.js')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  if (req.body?.likes === undefined)
    req.body.likes = 0
  
  if (req.body?.title === undefined || req.body?.url === undefined) {
    res.status(400).end()
  }

  const user = req.user
  const blog = new Blog({
    ...req.body,
    user: user._id
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  res.status(201).json(result)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user
  try {
    const blogToDelete = await Blog.findById(req.params.id)
    if (!blogToDelete) {
      res.status(404).end() // blog doesn't exist
    }

    if (user.id !== blogToDelete.user.toString()) {
      res.status(401).json({ error: 'user id that sent delete request is not owner of blog' })
    }
    const result = await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end() // successful delete

  } catch (err) {
    res.status(400).json({ error: err }) // blog id is malformatted
  }
})

blogsRouter.put('/', async (req, res) => {
  const blogId = req.body.id
  const updatedObj = {
    likes: req.body.likes
  }

  try {
    const result = await Blog.findByIdAndUpdate(blogId, updatedObj)
    if (!result) {
      res.status(404).end() // blog doesn't exist
    }
    res.status(200).end() // successful put

  } catch (err) {
    res.status(400).end() // blog id is malformatted
  }
})

module.exports = blogsRouter