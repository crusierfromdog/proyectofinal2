const React = require('react');
const { createRoot } = require('react-dom/client');
const User = require('./User');

createRoot(document.getElementById('app')).render(<User {...window.HYDRATION_PROPS} />)