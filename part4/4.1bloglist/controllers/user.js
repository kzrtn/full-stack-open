const bcrypt = require('bcrypt')
const logger = require('../utils/logger.js')

const userRouter = require('express').Router()

userRouter.post('/', (req, res) => {
  logger.info(req.body)

  res
    .status(200)
    .json({
      "created": "true"
    })
})

module.exports = userRouter