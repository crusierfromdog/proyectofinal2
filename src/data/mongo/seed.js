require('dotenv').config()

const crypto = require('crypto')
const productManager = require('./managers/productManager')
const userManager = require('./managers/userManager')

const seed = async () => {
    console.log('Creating products...\n')
    for (let i = 0; i < 40; i++) {
        await productManager.create({
            title: `Product ${i + 1}`
        })
        console.log('.')
    }

    console.log('Creating users...\n')
    for (let i = 0; i < 4; i++) {
        await userManager.create({
            email: `email${i}@memail.com`,
            password: crypto.randomBytes(12).toString("hex")
        })
    }
}

seed()
