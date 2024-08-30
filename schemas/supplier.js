const { Schema } = require('mongoose')

const supplierSchema = new Schema({
    name: String,
    address: String,
    contact: String
})

supplierSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id

        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = supplierSchema