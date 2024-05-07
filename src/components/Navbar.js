const React = require('react')

const Navbar = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px',
            alignItems: 'center'
        }}>
            <a href="/"><img src='/logo.png' height={50} width={50}/></a>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <a href="/" style={{ marginLeft: '12px' }}>Home</a>
                <a href="/cart" style={{ marginLeft: '12px' }}>Cart</a>
                <a href="/user" style={{ marginLeft: '12px' }}>Profile</a>
            </div>
        </div>
    )
}

module.exports = Navbar