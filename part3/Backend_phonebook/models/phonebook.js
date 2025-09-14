const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: [true, 'name is required'],
        unique: true
    },
    number: {
        type: String,
        minlength: 8,
        required: [true, 'number is required'],
        validate: {
            validator: function(v) {
                return /^\d+-\d+$/.test(v);
            },
            message: props =>  `${props.value} is not a valid phone number!`
        }
    },
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)