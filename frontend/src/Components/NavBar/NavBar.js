//import styles from './NavBar.module.css';
import './NavBar.css';
import logo from '../../Images/PRYAC_logo-reversed.png';

function NavBar() {
  return (
      <header className="navbar">
        <a className="logo"> 
          <img src={logo} width= "auto" height="45" alt=""></img>
        </a>
        <nav>
            <ul className="navlinks">
              <li><a href="#">Reports</a></li>
              <li><a href="#">Opportunities</a></li>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Help</a></li>
            </ul>
        </nav>
      </header>
  );
}

export default NavBar;