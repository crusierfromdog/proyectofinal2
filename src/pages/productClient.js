const React = require('react');
const { createRoot } = require('react-dom/client');
const Product = require('./Product');

createRoot(document.getElementById('app')).render(<Product {...window.HYDRATION_PROPS} />)