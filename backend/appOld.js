const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()


// these are the middleware

const errorHandler = (error, request, response, next) => {
    console.error('mao ni ang error handler' , error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        console.log('validation error sir')
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
const Note = require('./mongoose/models/phonebookNote')

app.use(express.static('build'))

// this is the logger
// app.use(morgan('tiny'))
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())
// this is the body parser
app.use(express.json())

app.use(requestLogger)
app.use(cors())

// ************** THESE ARE THE ROUTE HANDLERS *************** //


// app.get('/api/phonebook', (request, response) => {
//     response.json(phonebook)
// })

app.get('/api/phonebook', (request, response) => {
    Note.find({}).then(notes => {
        console.log('yu')
        response.json(notes)
    })
})

app.post('/api/phonebook', (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        number: body.number,
        name: body.name
    })


    note.save()
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(error => next(error))
})

// app.get('/api/phonebook/:id', (request, response) => {
//     Note.findById(request.params.id).then(note => {
//         response.json(note)
//     })
// })
app.get('/api/phonebook/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            next(error)
        })
})

app.delete('/api/phonebook/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body

    Note.findByIdAndUpdate(
        request.params.id,
        { content, important },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})


// ************ END ROUTE HANDLER ************** //


// handler of requests with unknown endpoint
app.use(unknownEndpoint)

// this has to be the last loaded middleware.
app.use(errorHandler)


// const PORT = 3001
// app.listen(PORT, () => {
//     console.log('hey yow mga kaibigan halinat tayoy magkwentuhan')
//     console.log(`Server running on port ${PORT}`)
// })


// const PORT = process.env.PORT || 3001
// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
