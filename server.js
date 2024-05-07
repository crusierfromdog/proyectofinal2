require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { generateHTML } = require('./utils')

const app = express()
const port = 3000

// API Routers
const productsRouter = require('./src/routers/productsRouter')
const usersRouter = require('./src/routers/usersRouter')
const cartsRouter = require('./src/routers/cartsRouter')

// Frontend Pages
const Home = require('./src/pages/Home')
const Search = require('./src/pages/Search')
const Product = require('./src/pages/Product')
const Cart = require('./src/pages/Cart')
const User = require('./src/pages/User')

app.use(express.urlencoded({ extended: true }), morgan('short'))
app.use(express.static('public'))

app.get('/ping', (_, res) => {
    res.send('pong')
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Unhandled error: ${err.message}`);
});


// Rutas de la API
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/carts', cartsRouter);

// Rutas del frontend
app.get('/', (req, res) => {
    const page = req.query.page || 1
    const reactMarkup = ReactDOMServer.renderToString(<Home page={page}/>);
    res.send(generateHTML(reactMarkup, 'homeClient.js', { page }));
});

app.get('/product/:pid', (req, res) => {
    const reactMarkup = ReactDOMServer.renderToString(<Product id={req.params.pid} />);
    res.send(generateHTML(reactMarkup, '../productClient.js', { id: req.params.pid }));
});

app.get('/search/:category', (req, res) => {
    const reactMarkup = ReactDOMServer.renderToString(<Search category={req.params.category} />);
    res.send(generateHTML(reactMarkup, '../searchClient.js', { category: req.params.category }));
});

app.get('/cart', (req, res) => {
    const reactMarkup = ReactDOMServer.renderToString(<Cart />);
    res.send(generateHTML(reactMarkup, 'cartClient.js'));
})

// Renderiza el usuario con sesión activa (ver sessionMiddleware.js)
app.get('/user', (req, res) => {
    const reactMarkup = ReactDOMServer.renderToString(<User />);
    res.send(generateHTML(reactMarkup, 'userClient.js'));
})

app.get('*', function(_, res){
    res.status(404).send('Not found');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}...`)
})