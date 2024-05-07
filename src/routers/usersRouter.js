const express = require('express');
const sessionMiddleware = require('../middlewares/sessionMiddleware');
const userManager = require('../data/mongo/managers/userManager');

const usersRouter = express();

usersRouter.use(sessionMiddleware);

usersRouter.get('/ping', (req, res) => {
    res.send('pong from users')
})

usersRouter.get('/', async (req, res) => {
    const id = req.userId || ''

    if (id === '') {
        res.status(401).json({ msg: 'Session not valid' })
        return
    }

    const user = await userManager.readOne(id)

    if (user === undefined) {
        res.status(404).json({ msg: 'User not found' })
        return
    }

    res.status(200).json({ user })
})

module.exports = usersRouter;