const express = require('express');
const bodyParser = require('body-parser');
const productManager = require('../data/mongo/managers/productManager');

const productsRouter = express();

productsRouter.get('/ping', (req, res) => {
    res.send('pong from products')
})

// Buscar todos los productos
productsRouter.get('/', async (req, res) => {
    const category = req.query.category ? req.query.category : ''
    const page = req.query.page ? req.query.page : 1

    const response = await productManager.read(category, page)

    res.status(200).json(response)
})

// Buscar un producto por su ID
productsRouter.get('/:pid', async (req, res) => {
    const id = req.params.pid || ''

    if (id === '') {
        res.status(400).json({ msg: 'Product id is missing' })
        return
    }

    const product = await productManager.readOne(id)

    if (product === undefined) {
        res.status(404).json({ msg: 'Product not found' })
        return
    }

    res.status(200).json({ product })
})

// Crear un producto
productsRouter.post('/', bodyParser.json(), async (req, res) => {
    const data = req.body

    if (!data.title) {
        res.status(400).json({ msg: 'Title is missing' });
        return
    }

    const product = {
        title: data.title,
        photo: data.photo || 'https://placehold.it/500/500',
        category: data.category || '1',
        price: data.price || 1,
        stock: data.stock || 1
    }

    try {
        const createdProduct = await productManager.create(product)
        res.status(201).json({ msg: 'Product created successfuly', product: createdProduct })
    } catch (error) {
        throw new Error(error.message)
    }
})

// Eliminar un producto
productsRouter.delete('/:pid', async (req, res) => {
    const id = req.params.pid || ''

    if (id === '') {
        res.status(400).json({ msg: 'Product id is missing' })
        return
    }

    try {
        const deletedProduct = await productManager.destroy(id)

        if (deletedProduct === undefined) {
            res.status(404).json({ msg: 'Product not found' })
            return
        }

        res.status(201).json({ msg: 'Product deleted successfuly', product: deletedProduct })
    } catch (error) {
        throw new Error(error.message)
    }
})

// Actualizar un producto
productsRouter.put('/:pid', bodyParser.json(), async (req, res) => {
    const id = req.params.pid || ''

    if (id === '') {
        res.status(400).json({ msg: 'Product id is missing' })
        return
    }

    const data = req.body

    if (data.title && data.title === '') {
        res.status(400).json({ msg: 'Title cannot be empty' });
        return
    }

    const product = {}

    if (data.title) {
        product.title = data.title
    }

    if (data.photo) {
        if (data.photo === '') {
            product.photo = 'https://placehold.it/500/500'
        } else {
            product.photo = data.photo
        }
    }

    if (data.category) {
        if (data.category === '') {
            product.category = '1'
        } else {
            product.category = data.category
        }
    }

    if (data.price) {
        if (data.price <= 0) {
            product.price = 1
        } else {
            product.price = data.price
        }
    }

    if (data.stock) {
        if (data.stock < 0) {
            product.stock = 0
        } else {
            product.stock = data.stock
        }
    }

    try {
        const updatedProduct = await productManager.update(id, product)

        if (updatedProduct === undefined) {
            res.status(404).json({ msg: 'Product not found' })
            return
        }

        res.status(201).json({ msg: 'Product updated successfuly', product: updatedProduct })
    } catch (error) {
        throw new Error(error.message)
    }
})


module.exports = productsRouter;