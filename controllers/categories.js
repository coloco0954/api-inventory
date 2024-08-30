const Category = require('../models/Category')

class CategoryController {
    static async getAll(req, res, next) {
        try {
            const categories = await Category.find({})

            res.status(200).json(categories)
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const id = req.params.id
            const category = await Category.findById(id)

            if (!category) {
                return res.status(404).json({ error: 'category not found' })
            }

            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            const category = req.body

            if (!category || !category.name) {
                return res.status(400).json({ message: 'req.name is missing' })
            }

            const newCategory = new Category({
                name: category.name
            })

            const saveNewCategory = await newCategory.save()

            res.status(201).json(saveNewCategory)
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const id = req.params.id
            const newName = req.body

            if (!newName || !newName.name) {
                return res.status(400).json({ message: 'req.name is missing' })
            }

            const category = await Category.findByIdAndUpdate(id, newName, { new: true })

            if (!category) {
                return res.status(404).json({ error: 'category not found' })
            }

            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const id = req.params.id
            const category = await Category.findById(id)

            if (!category) {
                return res.status(404).json({ error: 'category not found' })
            }

            await Category.findByIdAndDelete(id)

            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController