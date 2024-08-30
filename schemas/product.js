const { Schema } = require('mongoose')

const productSchema = new Schema({
    name: String,
    description: String,
    quantity: Number,
    price: Number,
    category_id: String,
    category_name: String,
    supplier_id: String,
    supplier_name: String
})

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id

        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = productSchema