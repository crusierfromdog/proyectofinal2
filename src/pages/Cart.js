const React = require('react');
const Axios = require('axios').default;
const Navbar = require('../components/Navbar');
const Product = require('../components/Product');
const Cart = require('../components/Cart');

const CartPage = () => {
  const [carts, setCarts] = React.useState([])

  React.useEffect(() => {
    Axios.get('/api/carts')
      .then((response) => {
        setCarts(response.data.carts)
      })
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {carts.map((cart) => {
          return (
            <Cart 
              id={cart._id}
              productId={cart.product}
              quantity={cart.quantity}
              key={cart._id}
            />
          )
        })}
      </div>
    </div>
  );
};

module.exports = CartPage;