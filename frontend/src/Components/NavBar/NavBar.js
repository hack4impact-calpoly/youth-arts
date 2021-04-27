//import styles from './NavBar.module.css';
import './NavBar.css';
import logo from '../../Images/PRYAC_logo-reversed.png';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  const { user } = props;
  return (
      <header className="navbar">
        <Link className="logo" to="/anonDashboard">
          <img src={logo} width= "auto" height="45" alt=""></img>
        </Link>
        <nav>
            <ul className="navlinks">
              <li><Link to="/Reports">Reports</Link></li>
              <li><Link to="/opportunities" >Opportunities</Link></li>
              <li> <Link to="/authDashboard">Dashboard</Link></li>
              <li><Link to="/Calendar">Calendar</Link></li>
              <li><Link to="/FAQ">FAQ</Link></li>
              { user ? (
                <li><a href="http://localhost:4000/auth/logout">Log Out</a></li>
              ) : 
                <li><Link to="/Login">Login</Link></li>
              }
            </ul>
        </nav>
      </header>
  );
}

export default NavBar;