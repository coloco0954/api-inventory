const { Schema } = require('mongoose')

const categorySchema = new Schema({
    name: String
})

categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id

        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = categorySchema