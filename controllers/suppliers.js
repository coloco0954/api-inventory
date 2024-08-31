const Supplier = require('../models/Supplier')

class SupplierController {
    static async getAll(req, res, next) {
        try {
            const suppliers = await Supplier.find({})

            res.status(200).json(suppliers)
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const id = req.params.id
            const supplier = await Supplier.findById(id)

            if (!supplier) {
                return res.status(404).json({ error: 'supplier not found' })
            }

            res.status(200).json(supplier)
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            const supplier = req.body

            if (!supplier || !supplier.name || !supplier.address || !supplier.contact) {
                return res.status(400).json({ message: 'req.name, req.address or req.contact is missing' })
            }

            const newSupplier = new Supplier({
                name: supplier.name,
                address: supplier.address,
                contact: supplier.contact
            })

            const saveNewSupplier = await newSupplier.save()

            res.status(201).json(saveNewSupplier)
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const id = req.params.id
            const newInfo = req.body

            const hasAtLeastOneField = newInfo.name || newInfo.address || newInfo.contact

            if (!hasAtLeastOneField) {
                return res.status(400).json({ message: 'at least one field is required to edit' })
            }

            const supplier = await Supplier.findByIdAndUpdate(id, newInfo, { new: true })

            if (!supplier) {
                return res.status(404).json({ error: 'supplier not found' })
            }

            res.status(200).json(supplier)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const id = req.params.id
            const supplier = await Supplier.findById(id)

            if (!supplier) {
                return res.status(404).json({ error: 'supplier not found' })
            }

            await Supplier.findByIdAndDelete(id)

            res.status(200).json(supplier)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = SupplierController