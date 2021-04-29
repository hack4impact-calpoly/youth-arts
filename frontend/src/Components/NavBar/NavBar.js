//import styles from './NavBar.module.css';
import './NavBar.css';
import logo from '../../Images/PRYAC_logo-reversed.png';
<<<<<<< HEAD
import {Link} from 'react-router-dom'
=======
import { Link } from 'react-router-dom';
>>>>>>> 18d32fff71a29355a441d774a018c5a129cf0423

const NavBar = (props) => {
  const { user } = props;
  return (
      <header className="navbar">
        <Link className="logo" to="/anonDashboard">
          <img src={logo} width= "auto" height="45" alt=""></img>
        </Link>
        <nav>
            <ul className="navlinks">
<<<<<<< HEAD
              <li><Link to="#">Reports</Link></li>
              <li><Link to="#">Opportunities</Link></li>
              <li><Link to="/anonDashboard">Dashboard</Link></li>
              <li><Link to="#">Help</Link></li>
              <li><Link to="/OpportunityCheckout">Cart</Link></li>
=======
              <li><Link to="/Reports">Reports</Link></li>
              <li><Link to="/opportunities" >Opportunities</Link></li>
              <li> <Link to="/authDashboard">Dashboard</Link></li>
              <li><Link to="/Calendar">Calendar</Link></li>
              {user && user.admin !== null && user.admin === true ? <li><a href={`${process.env.REACT_APP_CLIENT_URL}/directory`}>Directory</a></li> : null}
              <li><Link to="/FAQ">FAQ</Link></li>
              { user ? (
                <li><a href={`${process.env.REACT_APP_SERVER_URL}/auth/logout`}>Log Out</a></li>
              ) : 
                <li><Link to="/Login">Login</Link></li>
              }
>>>>>>> 18d32fff71a29355a441d774a018c5a129cf0423
            </ul>
        </nav>
      </header>
  );
}

export default NavBar;