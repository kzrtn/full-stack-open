const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const logger = require('../utils/logger.js')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  if (req.body?.likes === undefined)
    req.body.likes = 0
  
  if (req.body?.title === undefined || req.body?.url === undefined) {
    res.status(400).end()
  }

  const token = jwt.verify(req.token, process.env.SECRET)
  if(!token.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(token.id)
  if (!user) {
    return res.status(400).json({ error: 'user ID is missing or not valid'})
  }

  const blog = new Blog({
    ...req.body,
    user: user._id
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  const token = jwt.verify(req.token, process.env.SECRET)
  if(!token.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(token.id)
  if (!user) {
    return res.status(400).json({ error: 'user ID is missing or not valid'})
  }

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