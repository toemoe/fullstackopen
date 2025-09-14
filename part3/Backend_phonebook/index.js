require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Phonebook = require('./models/phonebook')
const path = require('path')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())

// logger
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.body(req, res)
    ].join(' ')
  })
)

app.get('/api/persons', (req, res, next) => {
  Phonebook.find({}).then(person => {
    res.json(person)
  }).catch(error => { next(error) })
})

app.get('/info', (req, res, next) => {
  Phonebook.countDocuments().then(count => {
    const date = new Date()
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${date}</p>`
    )}).catch(error => { next(error) })
})

app.get('/api/persons/:id', (req, res, next) => {
  Phonebook.findById(req.params.id).then(person => {
    res.json(person)
  }).catch(error => { next(error) })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Phonebook.findByIdAndDelete(req.params.id).then(result => {
    if (result) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: { message: 'Not found' }, })
    }
  }).catch(error => next(error))
})

app.put('/api/persons/:id', async (req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }
  try {
    const updatePerson = await Phonebook.findByIdAndUpdate(
      req.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query' },
    )
    if (updatePerson) {
      res.json(updatePerson)
    } else {res.status(404).json({ error: 'Not found' })}
  } catch (error) { next(error) }
})

app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body

  if (!name) {
    return res.status(400).json({ error: 'name is missing' })
  }
  if (!number) {
    return res.status(400).json({ error: 'number is missing' })
  }
  try {
    const existing = await Phonebook.findOne({ name })
    if (existing) {
      return res.status(400).json({ error: 'name must be unique' })
    }

    const person = new Phonebook({ name, number })
    const savedPerson = await person.save()
    res.status(201).json(savedPerson)
  } catch (error) { next(error) }
})

app.use(express.static(path.join(__dirname, 'dist')))
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) { return next() }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
