import './NavBar.css';
import logo from '../../Images/YouthArtsLogoReversed.png';
import {Link} from 'react-router-dom'

const NavBar = (props) => {
  const { user } = props;

  const logout = async () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    })
    .then(() => window.location.reload());
  };

  return (
      <header className="navbar">
        <Link className="logo" to="/anonDashboard">
          <img src={logo} width= "auto" height="45" alt=""></img>
        </Link>
        <nav class="navbar-expand">
            <ul className="navlinks">
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/opportunities" >Opportunities</Link></li>
              <li><Link to="/Calendar">Calendar</Link></li>
              {user && user.admin !== null && user.admin === true ? <li><Link to="/Reports">Reports</Link></li> : null}
              {user && user.admin !== null && user.admin === true ? <li><Link to="/directory">Directory</Link></li> : null}
              <li><Link to="/FAQ">FAQ</Link></li>
              {user && user.boardMember !== null && user.boardMember === true ? <li><Link to="/logHours">Log Hours</Link></li> : null}
              { user ? <li><Link to="/registration">Profile</Link></li> : null }
              { user ? <li><Link to="/OpportunityCheckout">Cart</Link></li> : null }
              { user ? (
                <li><a href="/" onClick={logout}>Log Out</a></li>
              ) : 
                <li><Link to="/Login">Login</Link></li>
              }
            </ul>
        </nav>
        
      </header>
  );
}

export default NavBar;




