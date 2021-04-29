//import styles from './NavBar.module.css';
import './NavBar.css';
import logo from '../../Images/PRYAC_logo-reversed.png';
import {Link} from 'react-router-dom'

function NavBar() {
  return (
      <header className="navbar">
        <a className="logo"> 
          <img src={logo} width= "auto" height="45" alt=""></img>
        </a>
        <nav>
            <ul className="navlinks">
              <li><Link to="#">Reports</Link></li>
              <li><Link to="#">Opportunities</Link></li>
              <li><Link to="/anonDashboard">Dashboard</Link></li>
              <li><Link to="#">Help</Link></li>
              <li><Link to="/OpportunityCheckout">Cart</Link></li>
            </ul>
        </nav>
      </header>
  );
}

export default NavBar;