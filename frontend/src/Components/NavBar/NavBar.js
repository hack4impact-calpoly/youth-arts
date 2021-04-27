//import styles from './NavBar.module.css';
import './NavBar.css';
import logo from '../../Images/PRYAC_logo-reversed.png';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

function NavBar(props) {
  console.log(props.user);
  return (
      <header className="navbar">
        <a className="logo" href="/anonDashboard">> 
          <img src={logo} width= "auto" height="45" alt=""></img>
        </a>
        <nav>
            <ul className="navlinks">
              <li><Link to="/Reports">Reports</Link></li>
              <li><Link to={{pathname:"/opportunities",
                              state:{user:props.user}}} >Opportunities</Link></li>
              <li> <Link to={{pathname:"/authDashboard",
                              state:{user:props.user}}}>Dashboard</Link></li>
              <li><Link to={{pathname:"/Calendar",
                              mu:props.user}}>Calendar</Link></li>
              <li><Link to="/FAQ">FAQ</Link></li>
            </ul>
        </nav>
      </header>
  );
}

export default NavBar;