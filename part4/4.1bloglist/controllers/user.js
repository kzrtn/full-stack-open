const bcrypt = require('bcrypt')
const logger = require('../utils/logger.js')
const User = require('../models/user.js')

const userRouter = require('express').Router()

userRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body

  const saltRounds = 10
  const passwordHash = bcrypt.hashSync(password, saltRounds)

  const user = new User({
    username: username,
    password: passwordHash,
    name: name
  })
  
  const result = await user.save()

  res
    .status(200)
    .json(result)
})

module.exports = userRouter