const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json()) 

let persons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' }
]

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

app.get('/api/persons', (req, res) => {
  res.status(200).json(persons)
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.status(200).send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find((p) => p.id === id)

  if (person) {
    res.status(200).json(person)
  } else {
    res.status(404).json({ error: `Person with id ${id} not found` })
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter((p) => p.id !== id)
  res.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0
  return String(maxId + 1)
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name is missing' })
  }
  if (!body.number) {
    return res.status(400).json({ error: 'number is missing' })
  }
  if (persons.find((p) => p.name === body.name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  res.status(201).json(person)
})

const path = require('path')
app.use(express.static(path.join(__dirname, 'dist')))
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next()
    }
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
