const sessionMiddleware = (req, res, next) => {
    req.userId = '66399630db83cc80d0d1c126'
    next()
}

module.exports = sessionMiddleware