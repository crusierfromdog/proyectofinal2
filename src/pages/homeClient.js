const React = require('react');
const { createRoot } = require('react-dom/client');
const Home = require('./Home');

createRoot(document.getElementById('app')).render(<Home {...window.HYDRATION_PROPS} />)
