// Header.js
import React from 'react';
import Navbar from './Navbar';
import {Link} from 'react-router-dom'
import SmallScreensNavbar from './SmallScreensNavbar';
import { useWindowWidthAndHeight } from './CustomHooks';
import './Header.css';
import logo from '../../Images/YouthArtsLogoReversed.png';

const Header = (props) =>{
    // use our custom hook to get the the window size
    const { user } = props;
    const [width, height] = useWindowWidthAndHeight();
    return(
        <header className="navheader">
            <div className="header-inner">
                <Link className="header-logo" to="anonDashboard" smooth={true} >
                    <img src={logo} width= "auto" height="45" alt=""></img>
                </Link>
                
                { width > 1220 ?
                <Navbar navClass="nav-big"
                        linkClassName="nav-big-link"
                        user={user}/>
                :
                <SmallScreensNavbar navClass="nav-small"
                                    linkClassName = "nav-small-link"
                                    user={user}
                />
                } 
            </div>
        </header>
    )
}

export default Header;