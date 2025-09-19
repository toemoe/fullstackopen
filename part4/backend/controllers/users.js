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
    user
      ? response.json(user.toJSON())
      : response.status(404).json({ error: 'user not found' })
  } catch (error) { next(error) }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    console.log(request.body)
    const { username, name, password } = request.body

    if (!username || !password) {
      return response.status(400)
        .json({ error: 'username and password are required' })
    }

    if (username.length < 3 || password.length < 3) {
      return response.status(400)
        .json({ error: 'username and password must be at least 3 characters long' })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return response.status(400).json({ error: 'expected username to be unique' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter