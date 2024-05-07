const { genId, openDatabase, updateDatabase } = require('./utils')

const cartManager = {
    create: async (data) => {
        const id = genId()
        const content = await openDatabase(fileName)
        const cart = { id, ...data }

        content.push(cart)

        await updateDatabase(fileName, content)

        return cart
    },
    read: async (userId) => {
        const content = await openDatabase(fileName)

        return content.filter((el) => el.user_id === userId)
    },
    readOne: async (id) => {
        const content = await openDatabase(fileName)
        const cart = content.find((el) => el.id === id)
        return cart
    },
    update: async (id, userId, data) => {
        const content = await openDatabase(fileName)
        const cartIndex = content.findIndex((el) => el.id === id && el.user_id === userId)

        if (cartIndex === -1) {
            return undefined
        }

        const cart = content[cartIndex]
        const updatedCart = { ...cart, ...data}


        content[cartIndex] = updatedCart

        await updateDatabase(fileName, content)

        return updatedCart
    },
    destroy: async (id, userId) => {
        const content = await openDatabase(fileName)
        const toDeleteCart = content.find((el) => el.id === id && el.user_id === userId)

        if (toDeleteCart === undefined) {
            return undefined
        }

        await updateDatabase(fileName, content.filter((el) => el.id !== id))
        
        return toDeleteCart
    }
}

module.exports = cartManager