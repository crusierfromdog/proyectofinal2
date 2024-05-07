const crypto = require('crypto')

const database = []

const utils = {
    genId: () => {
        const id = crypto.randomBytes(12).toString("hex")
        return id
    },
    openDatabase: async (_fileName) => {
        return database
    },
    updateDatabase: async (_fileName, content) => {
        database = content
        console.log('Updated in memory database with', database)
    }
}

module.exports = utils