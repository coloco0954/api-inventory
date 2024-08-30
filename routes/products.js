const { Router } = require('express')
const ProductController = require('../controllers/products')

const productRouter = Router()

productRouter.get('/', ProductController.getAll)

productRouter.get('/:id', ProductController.getById)

productRouter.post('/', ProductController.create)

productRouter.put('/:id', ProductController.update)

productRouter.delete('/:id', ProductController.delete)

module.exports = productRouter