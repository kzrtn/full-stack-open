const bcrypt = require('bcrypt')
const logger = require('../utils/logger.js')
const User = require('../models/user.js')

const userRouter = require('express').Router()

userRouter.get('/', async (req, res) => {
  const results = User.find({})
  res
    .status(200)
    .json(result)
})

userRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body

  if (!password) {
    return res.status(400).json({ error: 'password missing' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User({
    username,
    passwordHash,
    name
  })

  const result = await user.save()

  res
    .status(200)
    .json(result)
})

module.exports = userRouter