const React = require('react');
const Axios = require('axios').default;
const Navbar = require('../components/Navbar');
const User = require('../components/User');

const UserPage = () => {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    Axios.get('/api/users')
        .then((response) => {
            setUser(response.data.user)
    })
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      { user && <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <User {...user} />
      </div> }
    </div>
  );

};

module.exports = UserPage;