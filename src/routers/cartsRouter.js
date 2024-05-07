const express = require('express');
const bodyParser = require('body-parser');
const sessionMiddleware = require('../middlewares/sessionMiddleware');

const cartManager = require('../data/mongo/managers/cartManager');

const cartsRouter = express();

cartsRouter.use(sessionMiddleware);

cartsRouter.get('/ping', (_, res) => {
    res.send('pong from carts')
})

cartsRouter.get('/', async (req, res) => {
    const userId = req.userId

    if (!userId) {
        res.status(401).json({ msg: 'No valid session' })
        return
    }

    const carts = await cartManager.read(userId)

    res.status(200).json({ carts })
})

cartsRouter.get('/:cid', async (req, res) => {
    const id = req.params.cid || ''

    if (id === '') {
        res.status(400).json({ msg: 'Cart id is missing' })
        return
    }

    const cart = await cartManager.readOne(id)

    if (cart === undefined) {
        res.status(404).json({ msg: 'Cart not found' })
        return
    }

    res.status(200).json({ cart })
})

cartsRouter.post('/', bodyParser.json(), async (req, res) => {
    const data = req.body
    const userId = req.userId

    if (!userId) {
        res.status(401).json({ msg: 'No valid session' })
        return
    }

    if (!data.productId) {
        res.status(400).json({ msg: 'Product reference is missing' });
        return
    }

    if (!data.quantity) {
        res.status(400).json({ msg: 'Undefined quantity when creating cart' });
        return
    }

    const cart = {
        user_id: userId,
        product_id: data.productId,
        quantity: data.quantity,
        state: 'reserved',
    }

    try {
        const createdCart = await cartManager.create(cart)
        res.status(201).json({ msg: 'Cart created successfuly', cart: createdCart })
    } catch (error) {
        throw new Error(error.message)
    }
})

cartsRouter.delete('/:cid', async (req, res) => {
    const id = req.params.cid || ''

    const userId = req.userId

    if (!userId) {
        res.status(401).json({ msg: 'No valid session' })
        return
    }

    if (id === '') {
        res.status(400).json({ msg: 'Cart id is missing' })
        return
    }

    try {
        const deletedCart = await cartManager.destroy(id, userId)

        if (deletedCart === undefined) {
            res.status(404).json({ msg: 'Cart not found' })
            return
        }

        res.status(201).json({ msg: 'Cart deleted successfuly', product: deletedCart })
    } catch (error) {
        throw new Error(error.message)
    }
})

cartsRouter.put('/:cid', bodyParser.json(), async (req, res) => {
    const id = req.params.cid || ''

    if (id === '') {
        res.status(400).json({ msg: 'Cart id is missing' })
        return
    }

    const userId = req.userId

    if (!userId) {
        res.status(401).json({ msg: 'No valid session' })
        return
    }

    const data = req.body

    if (data.quantity <= 0) {
        res.status(400).json({ msg: 'Cannot update cart product quantity to zero or lower' })
        return
    }

    const cart = {
        quantity: data.quantity
    }

    try {
        const updatedCart = await cartManager.update(id, userId, cart)

        if (updatedCart === undefined) {
            res.status(404).json({ msg: 'Cart not found' })
            return
        }

        res.status(201).json({ msg: 'Cart updated successfuly', cart: updatedCart })
    } catch (error) {
        throw new Error(error.message)
    }
})


module.exports = cartsRouter;