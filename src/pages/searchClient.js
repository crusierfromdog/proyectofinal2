const React = require('react');
const { createRoot } = require('react-dom/client');
const Search = require('./Search');

createRoot(document.getElementById('app')).render(<Search {...window.HYDRATION_PROPS} />)