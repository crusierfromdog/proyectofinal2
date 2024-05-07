const React = require('react');
const Axios = require('axios').default;
const Navbar = require('../components/Navbar');
const Product = require('../components/Product');

const Search = ({ category }) => {
    if (!category) {
        window.location.href = '/'
    }

    const [products, setProducts] = React.useState([])

    React.useEffect(() => {
        Axios.get(`/api/products?category=${category}`)
            .then((response) => {
                setProducts(response.data.products)
        })
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map((product) => {
                    return (
                        <Product 
                            category={product.category}
                            photo={product.photo}
                            price={product.price}
                            stock={product.stock}
                            title={product.title}
                            id={product.id}
                            key={product.id}/>
                        )
                })}
            </div>
        </div>
    );
};

module.exports = Search;