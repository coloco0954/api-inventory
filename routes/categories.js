const { Router } = require('express')
const CategoryController = require('../controllers/categories')

const categoryRouter = Router()

categoryRouter.get('/', CategoryController.getAll)

categoryRouter.get('/:id', CategoryController.getById)

categoryRouter.post('/', CategoryController.create)

categoryRouter.patch('/:id', CategoryController.update)

categoryRouter.delete('/:id', CategoryController.delete)

module.exports = categoryRouter