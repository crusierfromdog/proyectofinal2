const React = require('react');
const Axios = require('axios').default;
const Navbar = require('../components/Navbar');
const Product = require('../components/Product');

const ProductPage = ({ id }) => {
  if (!id) {
      window.location.href = '/'
  }

  const [product, setProduct] = React.useState(null)

  React.useEffect(() => {
    Axios.get(`/api/products/${id}`)
        .then((response) => {
            setProduct(response.data.product)
    })
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      { product && <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Product {...product} id={product._id} />
      </div> }
    </div>
  );

};

module.exports = ProductPage;