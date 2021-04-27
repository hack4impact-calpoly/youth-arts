import "./OpportunitiesPage.css"
import NavBar from "../../Components/NavBar/NavBar";
import SearchOpportunities from "../../Components/SearchOpportunities/SearchOpportunities"
import React, {useEffect, useState} from 'react';

function OpportunitiesPage(props) {
    const [user, setUser] = useState(props.user, props.updateUser);
    console.log(user);
    console.log(props);
    // console.log(location);
    return (
        <body>
            <NavBar user={user}/>
            <div id="oppsHeader">
                <h1 id="oppsTitle">OPPORTUNITIES</h1>
            </div>
            <SearchOpportunities />
        </body>
    );
}

export default OpportunitiesPage;