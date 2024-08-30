const { Router } = require('express')
const SupplierController = require('../controllers/suppliers')

const supplierRouter = Router()

supplierRouter.get('/', SupplierController.getAll)

supplierRouter.get('/:id', SupplierController.getById)

supplierRouter.post('/', SupplierController.create)

supplierRouter.put('/:id', SupplierController.update)

supplierRouter.delete('/:id', SupplierController.delete)

module.exports = supplierRouter