const Product = require('../models/Product')
const Category = require('../models/Category')
const Supplier = require('../models/Supplier')

class ProductController {
    static async getAll(req, res, next) {
        try {
            let products = await Product.find({})
            const { category, min_price, max_price, in_stock } = req.query

            if (category) {
                products = products.filter(product => product.category_name.toLowerCase() === category.toLowerCase())
            }

            if (min_price) {
                products = products.filter(product => product.price >= parseFloat(min_price))
            }

            if (max_price) {
                products = products.filter(product => product.price <= parseFloat(max_price))
            }

            if (in_stock) {
                const stockFilter = in_stock === 'true'
                products = products.filter(product => product.in_stock === stockFilter)
            }

            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const id = req.params.id
            const product = await Product.findById(id)

            if (!product) {
                return res.status(404).json({ error: 'product not found' })
            }

            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            const product = req.body

            if (!product || !product.name || !product.description || !product.category_id || !product.supplier_id) {
                return res.status(400).json({ error: 'req.name, req.description, req.category_id or req.supplier_id is missing' })
            }

            const category = await Category.findById(product.category_id)
            const supplier = await Supplier.findById(product.supplier_id)

            if (!category || !supplier) {
                return res.status(404).json({ error: 'category or supplier not found' })
            }

            if (product.price < 0 || product.quantity < 0) {
                return res.status(400).json({ error: 'the price or quantity must be greater than 0' })
            }

            const newProduct = new Product({
                name: product.name,
                description: product.description,
                quantity: product.quantity,
                price: product.price ? product.price : 10,
                category_id: product.category_id,
                category_name: category.name,
                supplier_id: product.supplier_id,
                supplier_name: supplier.name,
                in_stock: product.quantity > 0 ? true : false
            })

            const saveNewProduct = await newProduct.save()

            res.status(201).json(saveNewProduct)
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const id = req.params.id
            let newInfo = req.body

            if (newInfo.category_name || newInfo.supplier_name) {
                return res.status(400).json({ message: 'You cannot edit the category name or provider name' })
            }

            const hasAtLeastOneField = newInfo.name || newInfo.description || newInfo.quantity || newInfo.price || newInfo.category_id || newInfo.supplier_id

            if (!hasAtLeastOneField) {
                return res.status(400).json({ message: 'At least one field is required to edit' });
            }

            if (newInfo.category_id) {
                const category = await Category.findById(newInfo.category_id)

                if (!category) {
                    return res.status(404).json({ error: 'category not found' })
                }

                const newCategory = {
                    "category_name": category.name
                }

                newInfo = { ...newInfo, ...newCategory }
            }

            if (newInfo.supplier_id) {
                const supplier = await Supplier.findById(newInfo.supplier_id)

                if (!supplier) {
                    return res.status(404).json({ error: 'supplier not found' })
                }

                const newSupplier = {
                    "supplier_name": supplier.name
                }

                newInfo = { ...newInfo, ...newSupplier }
            }

            const product = await Product.findByIdAndUpdate(id, newInfo, { new: true })

            if (!product) {
                return res.status(404).json({ error: 'product not found' })
            }

            res.status(200).json(product)

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const id = req.params.id
            const product = await Product.findById(id)

            if (!product) {
                return res.status(404).json({ error: 'product not found' })
            }

            await Product.findByIdAndDelete(id)

            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController