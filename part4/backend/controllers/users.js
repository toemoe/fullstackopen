const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.json(users.map(u => u.toJSON()))
  } catch (error) { next(error) }
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id)
    if (!user) {
      return response.status(404).json({ error: 'user not found' })
    }
    response.json(user.toJSON())
  } catch (error) { next(error) }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    if (!username || !password) {
      return response.status(400)
        .json({ error: 'username and password are required' })
    }

    if (username.length < 3 || password.length < 3) {
      return response.status(400)
        .json({ error: 'username and password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return response.status(400).json({ error: 'expected username to be unique' })
    }
    next(error)
  }
})

module.exports = usersRouter