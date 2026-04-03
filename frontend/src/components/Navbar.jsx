import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  color: isActive ? 'yellow' : 'white',
  margin: '10px',
  textDecoration: 'none'
});

function Navbar() {
  return (
    <nav className='navBar'>
      <NavLink to="/" style={linkStyle}>Home</NavLink>
      <NavLink to="/play" style={linkStyle}>Start</NavLink>
    </nav>
  );
}

export default Navbar