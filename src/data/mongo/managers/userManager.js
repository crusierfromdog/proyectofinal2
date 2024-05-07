const mongoose = require('mongoose')
const { openDatabase, closeDatabase } = require('./utils')

const userSchema = new mongoose.Schema({
    photo: {
        type: String,
        default: 'https://placehold.it/500/500',
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: '0'
    }
})

const User = mongoose.model('User', userSchema)

const userManager = {
    create: async (data) => {
        await openDatabase()

        const user = new User({
            ...data
        })

        try {
            await user.save()
        } catch (err) {
            console.error(err)
        }

        await closeDatabase()

        return user
    },
    read: async () => {
        await openDatabase()

        const user = await User.find()

        await closeDatabase()

        return user
    },
    readOne: async (id) => {
        await openDatabase()

        const user = await User.findById(id)
        
        await closeDatabase()

        return user
    },
    update: async (id, data) => {
        await openDatabase()

        await User.updateOne({ _id: id }, { ...data })
        const user = await User.findById(id)

        await closeDatabase()

        return user
    },
    destroy: async (id) => {
        await openDatabase()
        
        const user = await User.findById(id)
        await User.deleteOne({ _id: id })
        
        await closeDatabase()

        return user
    }
}

module.exports = userManager