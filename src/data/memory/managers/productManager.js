const { genId, openDatabase, updateDatabase } = require('./utils')

const productManager = {
    create: async (data) => {
        const id = genId()
        const content = await openDatabase(fileName)
        const product = { id, ...data }

        content.push(product)

        await updateDatabase(fileName, content)

        return product
    },
    read: async (category = '') => {
        const content = await openDatabase(fileName)

        if (category !== '') {
            return content.filter((el) => el.category === category)
        }

        return content
    },
    readOne: async (id) => {
        const content = await openDatabase(fileName)
        const product = content.find((el) => el.id === id)
        return product
    },
    update: async (id, data) => {
        const content = await openDatabase(fileName)
        const productIndex = content.findIndex((el) => el.id === id)

        if (productIndex === -1) {
            return undefined
        }

        const product = content[productIndex]
        const updatedProduct = { ...product, ...data}


        content[productIndex] = updatedProduct

        await updateDatabase(fileName, content)

        return updatedProduct
    },
    destroy: async (id) => {
        const content = await openDatabase(fileName)
        const toDeleteProduct = content.find((el) => el.id === id)

        if (toDeleteProduct === undefined) {
            return undefined
        }

        await updateDatabase(fileName, content.filter((el) => el.id !== id))
        
        return toDeleteProduct
    }
}

module.exports = productManager