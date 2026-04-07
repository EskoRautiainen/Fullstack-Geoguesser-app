import { NavLink } from 'react-router-dom';

// Ternary operator highlights selected page as yellow.
const linkStyle = ({ isActive }) => ({
  color: isActive ? 'yellow' : 'white',
  margin: '10px',
  textDecoration: 'none'
});

function Navbar() {
  return (
    <nav className='navBar'>
      <NavLink to="/" style={linkStyle}>Home</NavLink>
      <NavLink to="/play" style={linkStyle}>Play</NavLink>
    </nav>
  );
}

export default Navbar