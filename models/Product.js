const { model } = require('mongoose')
const productSchema = require('../schemas/product')

const Product = model('Product', productSchema)

module.exports = Product