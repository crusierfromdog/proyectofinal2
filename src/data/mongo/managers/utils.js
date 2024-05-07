const mongoose = require('mongoose')

const utils = {
    openDatabase: async () => {
        try {
            await mongoose.connect(process.env.MONGO_URL)
        } catch (err) {
            console.error('Fatal error, cannot connect to Mongo DB')
        }
    },
    closeDatabase: async () => {
        // await mongoose.disconnect()
    }
}

module.exports = utils