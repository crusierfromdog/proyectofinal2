const React = require('react');
const Axios = require('axios').default;
const Navbar = require('../components/Navbar');
const Product = require('../components/Product');

const Home = ({ page }) => {
  const [products, setProducts] = React.useState([])
  const [totalPages, setTotalPages] = React.useState(null)

  React.useEffect(() => {
    Axios.get(`/api/products?page=${page}`)
      .then((response) => {
        setProducts(response.data.products)
        setTotalPages(response.data.totalPages)
      })
  }, [])

  console.log('Total pages', totalPages)

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
              id={product._id}
              key={product._id}
            />
          )
        })}
      </div>
      {totalPages && (
          <div style={{display: 'flex', marginTop: '12px' }}>
            {Array.from({ length: totalPages }).map((page, index) => {
              return (
                <a href={`/?page=${index + 1}`} key={index + 1} style={{ marginRight: '4px'}}>{index + 1}</a>
              )
            })}
          </div>
        )}
    </div>
  );
};

module.exports = Home;