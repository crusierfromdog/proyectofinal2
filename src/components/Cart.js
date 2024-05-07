const React = require('react')
const Axios = require('axios').default;

const Cart = ({ id, productId, quantity }) => {
    const [product, setProduct] = React.useState(null)
    const [qty, setQty] = React.useState(quantity)

    React.useEffect(() => {
        Axios.get(`/api/products/${productId}`)
            .then((response) => {
                setProduct(response.data.product)
            })
    }, [])

    const addOne = async () => {
        setQty(qty + 1)
        Axios.put(`/api/carts/${id}`, { quantity: qty + 1 })
    }

    const removeOne = async () => {
        if (qty - 1 === 0) {
            return removeAll()
        }
        setQty(qty - 1)
        Axios.put(`/api/carts/${id}`, { quantity: qty - 1 })
    }

    const removeAll = async () => {
        Axios.delete(`/api/carts/${id}`)
            .then(() => {
                alert('Item deleted from cart')
            })
        setQty(0)
    }

    if (qty === 0) {
        return null
    }

    if (product === null) {
        return 'Loading ...'
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
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px' }}>
                <a href={`/product/${productId}`} style={{ fontSize: '16px', fontWeight: 'bold' }}>{product.title}</a>
                <span style={{ fontSize: '24px'}}>{product.price}</span>
                <span style={{ fontSize: '24px'}}>Quantity: <input type="text" disabled value={qty}/></span>
                <button style={{ marginTop: '8px' }} onClick={() => addOne()}>Add one</button>
                <button style={{ marginTop: '8px' }} onClick={() => removeOne()}>Remove one</button>
                <button style={{ marginTop: '8px' }} onClick={() => removeAll()}>Remove all</button>
            </div>
        </div>
    )
}

module.exports = Cart