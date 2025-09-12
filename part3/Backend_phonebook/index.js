const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// logger

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
}))


app.get('/api/persons/', (request, response) => {
    response.json(persons).status(200).end()
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`
    ).status(200).end()
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
    response.status(200).json(person)
    } else {
        response.status(404).json({ error: `Person with id ${id} not found` })
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0 
    ? Math.max(...persons.map(p => Number(p.id)))
    : 0

    return String(maxId + 1);
}

app.post('/api/persons/', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: `name is missing`
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: `number is missing`
        }) 
    } else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: `name must be unique`
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.status(201).json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})