const React = require('react')
const Axios = require('axios').default;

const Product = ({ category, photo, price, stock, title, id }) => {
    const addToCart = async () => {
        Axios.post('/api/carts', {
            productId: id,
            quantity: 1
        }).then(response => {
            if (response.status === 201) {
                alert('Product added to cart')
            }
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            border: '1px solid #fff', 
            borderRadius: '14px', 
            marginLeft: '4px', 
            marginRight: '4px' 
        }}>
            <img src={photo} height={100} width={100}/>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px' }}>
                <a href={`/product/${id}`} style={{ fontSize: '16px', fontWeight: 'bold' }}>{title}</a>
                <span style={{ fontSize: '24px'}}>{price}</span>
                <a href={`/search/${category}`} style={{ fontSize: '12px'}}>{category}</a>
                <button style={{ marginTop: '8px' }} onClick={() => addToCart()}>Add to cart</button>
            </div>
        </div>
    )
}

module.exports = Product