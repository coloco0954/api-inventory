const { model } = require('mongoose')

const supplierSchema = require('../schemas/supplier')

const Supplier = model('Supplier', supplierSchema)

module.exports = Supplier