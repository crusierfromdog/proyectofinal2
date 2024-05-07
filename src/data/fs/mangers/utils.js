const fs = require('fs/promises')
const crypto = require('crypto')

const utils = {
    genId: () => {
        const id = crypto.randomBytes(12).toString("hex")
        return id
    },
    openDatabase: async (fileName) => {
        try {
            const content = await fs.readFile(fileName, 'utf-8')
            return JSON.parse(content)
        } catch (err) {
            if (err.code === 'ENOENT' && err.syscall === 'open') {
                await fs.writeFile(fileName, JSON.stringify([]))
                return this.openDatabase(fileName)
            }
    
            throw new Error(err)
        }
    },
    updateDatabase: async (fileName, content) => {
        try {
            await fs.writeFile(fileName, JSON.stringify(content))
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = utils