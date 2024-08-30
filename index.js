require('dotenv').config()

const connectDB = require('./config/mongo')

connectDB()

const express = require('express')
const app = express()

const cors = require('cors')
const logger = require('./middlewares/loggerMIddleware')
const notFound = require('./middlewares/notFound')
const handleError = require('./middlewares/handleError')

const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const suppliersRouter = require('./routes/suppliers')

app.use(express.json())

app.use(cors())

app.use(logger)

app.use('/api/products', productsRouter)

app.use('/api/categories', categoriesRouter)

app.use('/api/suppliers', suppliersRouter)

app.use(notFound)

app.use(handleError)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})