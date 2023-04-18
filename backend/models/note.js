// const mongoose = require('mongoose')

// mongoose.set('strictQuery', false)

// // eslint-disable-next-line no-undef
// const url = process.env.MONGODB_URI

// console.log('connecting to', url)

// mongoose.connect(url)
//     .then(() => {
//         console.log('connected to MongoDB')
//     })
//     .catch((error) => {
//         console.log('error connecting to MongoDB:', error.message)
//     })

// const noteSchema = new mongoose.Schema({
//     content: {
//         type: String,
//         minLength: 5,
//         required: true
//     },
//     important: Boolean,
//     name: String,
//     number: {
//         type: String,
//         validate: {
//             validator: function (v) {
//                 return /\d{3}-\d{3}-\d{4}/.test(v)
//             },
//             message: props => `${props.value} is not a valid phone number!`
//         },
//         required: [true, 'User phone number required']
//     }
// })

// noteSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

// module.exports = mongoose.model('Note', noteSchema)

const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 5
    },
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
