// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../Images/YouthArtsLogoReversed.png";

const logout = async (props) => {
  fetch(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
  }).then(() => {
    props.updateProfile({});
    // window.location.reload();
  });
};

function Navbar({ navClass, linkClassName, user }) {
  return (
    <NavComponent
      navClass={navClass}
      linkClassName={linkClassName}
      user={user}
    />
  );
}

export function NavComponent({ onClick, navClass, linkClassName, user }) {
  return navClass === "nav-big" ? (
    <nav className="navbar-expand">
      <ul className="navlinks">
        <li>
          <Link smooth onClick={onClick} to="/">
            Dashboard
          </Link>
        </li>
        <li>
          <Link smooth onClick={onClick} to="/opportunities">
            Opportunities
          </Link>
        </li>
        <li>
          <Link smooth onClick={onClick} to="/Calendar">
            Calendar
          </Link>
        </li>
        {user && user.admin !== null && user.admin === true ? (
          <li>
            <Link onClick={onClick} to="/Reports">
              Reports
            </Link>
          </li>
        ) : null}
        {user && user.admin !== null && user.admin === true ? (
          <li>
            <Link onClick={onClick} to="/directory">
              Directory
            </Link>
          </li>
        ) : null}
        <li>
          <Link onClick={onClick} to="/FAQ">
            FAQ
          </Link>
        </li>
        {user && user.boardMember !== null && user.boardMember === true ? (
          <li>
            <Link onClick={onClick} to="/logHours">
              Log Hours
            </Link>
          </li>
        ) : null}
        {/* { user ? <li><Link onClick={onClick} to="/registration">Profile</Link></li> : null } */}
        {user ? (
          <li>
            <Link onClick={onClick} to="/OpportunityCheckout">
              Cart
            </Link>
          </li>
        ) : null}
        {user && user.signature ? (
          <li>
            <a href="/" onClick={logout}>
              Log Out
            </a>
          </li>
        ) : (
          <li>
            <Link onClick={onClick} to="/Login">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  ) : (
    <div>
      <Link className="header-logo-small" to="home" smooth>
        <img src={logo} width="auto" height="45" alt="" />
      </Link>
      <br />
      <nav className="navbar-expand">
        <ul className="navlinksDown">
          <br />
          <li>
            <Link smooth onClick={onClick} to="/">
              Dashboard
            </Link>
          </li>
          <li>
            <Link smooth onClick={onClick} to="/opportunities">
              Opportunities
            </Link>
          </li>
          <li>
            <Link smooth onClick={onClick} to="/Calendar">
              Calendar
            </Link>
          </li>
          {user && user.admin !== null && user.admin === true ? (
            <li>
              <Link onClick={onClick} to="/Reports">
                Reports
              </Link>
            </li>
          ) : null}
          {user && user.admin !== null && user.admin === true ? (
            <li>
              <Link onClick={onClick} to="/directory">
                Directory
              </Link>
            </li>
          ) : null}
          <li>
            <Link onClick={onClick} to="/FAQ">
              FAQ
            </Link>
          </li>
          {user && user.boardMember !== null && user.boardMember === true ? (
            <li>
              <Link onClick={onClick} to="/logHours">
                Log Hours
              </Link>
            </li>
          ) : null}
          {/* { user ? <li><Link onClick={onClick} to="/registration">Profile</Link></li> : null } */}
          {user ? (
            <li>
              <Link onClick={onClick} to="/OpportunityCheckout">
                Cart
              </Link>
            </li>
          ) : null}
          {user && user.signature ? (
            <li>
              <a href="/" onClick={logout}>
                Log Out
              </a>
            </li>
          ) : (
            <li>
              <Link onClick={onClick} to="/Login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
