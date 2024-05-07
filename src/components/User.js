const React = require('react')

const User = ({ email }) => {
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
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Welcome, {email}</span>
            </div>
        </div>
    )
}

module.exports = User