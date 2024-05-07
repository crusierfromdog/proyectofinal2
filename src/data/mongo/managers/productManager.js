const mongoose = require('mongoose')
const { openDatabase, closeDatabase } = require('./utils')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: 'https://placehold.it/500/500'
    },
    category: {
        type: String,
        default: 'available'
    },
    price: {
        type: Number,
        default: 1,
    },
    stock: {
        type: Number,
        default: 1
    }
})

const Product = mongoose.model('Product', productSchema)

const productManager = {
    create: async (data) => {
        await openDatabase()

        const product = new Product({
            ...data
        })

        try {
            await product.save()
        } catch (err) {
            console.error(err)
        }

        await closeDatabase()

        return product
    },
    read: async (category, page = 1) => {
        await openDatabase()
        const pageLimit = 10

        let products

        if (category) {
            products = await Product.find({ category: category }).limit(pageLimit).skip(pageLimit * (page - 1))
        } else {
            products = await Product.find().limit(pageLimit).skip(pageLimit * (page - 1))
        }

        const docCount = await Product.countDocuments().exec()

        console.log('Count', docCount)

        await closeDatabase()

        return { products, page, totalPages: Math.ceil(docCount / pageLimit) }
    },
    readOne: async (id) => {
        await openDatabase()

        console.log('Product Read One')

        const product = await Product.findById(id)
        
        await closeDatabase()

        return product
    },
    update: async (id, data) => {
        await openDatabase()

        await Product.updateOne({ _id: id }, { ...data })
        const product = await Product.findById(id)

        await closeDatabase()

        return product
    },
    destroy: async (id) => {
        await openDatabase()
        
        const product = await Product.findById(id)
        await Product.deleteOne({ _id: id})
        
        await closeDatabase()

        return product
    }
}

module.exports = productManager