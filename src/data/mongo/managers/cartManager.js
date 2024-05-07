const mongoose = require('mongoose')
const { openDatabase, closeDatabase } = require('./utils')

const cartSchema = new mongoose.Schema({
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    quantity: Number,
    state: {
        type: String,
        default: 'reserved'
    }
})

const Cart = mongoose.model('Cart', cartSchema)

const cartManager = {
    // Crea uno solo si no existe la misma combinación. Si existe, entonces le suma uno al quantity.
    create: async (data) => {
        await openDatabase()
        console.log(data)
        const query = await Cart.find({ user: data.userId, product: data.product_id }) 

        if (query.length > 0) {
            const existentCart = query[0]
            await Cart.updateOne({ user: data.userId, product: data.product_id }, { quantity: existentCart.quantity + 1})
        } else {
            const cart = new Cart({
                product: data.product_id,
                user: data.user_id,
                quantity: data.quantity,
            })
    
            try {
                const savedCart = await cart.save({ checkKeys: false })
                console.log('Saved cart', savedCart)
            } catch (err) {
                console.error(err)
            }
    
            await closeDatabase()
    
            return cart
        }
    },
    read: async (userId) => {
        await openDatabase()

        const carts = await Cart.find({ user: userId })

        await closeDatabase()

        return carts
    },
    readOne: async (id) => {
        await openDatabase()

        const cart = await Cart.findById(id)
        
        await closeDatabase()

        return cart
    },
    update: async (id, userId, data) => {
        await openDatabase()

        await Cart.updateOne({ _id: id, user: userId }, { ...data })
        const cart = await Cart.find({ _id: id, user: userId })

        await closeDatabase()

        return cart
    },
    destroy: async (id, userId) => {
        await openDatabase()
        
        const cart = await Cart.find({ _id: id, user: userId })
        await Cart.deleteOne({ _id: id, user: userId })
        
        await closeDatabase()

        return cart
    }
}

module.exports = cartManager