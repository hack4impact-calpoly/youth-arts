//import styles from './NavBar.module.css';
import './NavBar.css';
import logo from '../../Images/PRYAC_logo-reversed.png';

function NavBar() {
  return (
      <header className="navbar">
        <a className="logo" href="/anonDashboard">> 
          <img src={logo} width= "auto" height="45" alt=""></img>
        </a>
        <nav>
            <ul className="navlinks">
              <li><a href="/Reports">Reports</a></li>
              <li><a href="/opportunities">Opportunities</a></li>
              <li> <a href="/authDashboard">Dashboard</a></li>
              <li><a href="/Calendar">Calendar</a></li>
              <li><a href="/FAQ">FAQ</a></li>
            </ul>
        </nav>
      </header>
  );
}

export default NavBar;