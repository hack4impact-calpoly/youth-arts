import "./AnonymousDashboard.css";
import DashboardHeader from "./../../Components/DashboardHeader/DashboardHeader";
import About from "./../../Components/About/About";
import Opportuntites from "./../../Components/Opportunities/Opportunities";
import { Redirect } from 'react-router-dom'
import {useEffect, useState} from 'react';

function AnonymousDashboard(props) {
    const [user, setUser] = useState(props.user);
    const [userID, setUserID] = useState();

    useEffect(() => {
        async function fetchMyAPI() {
            let userId = window.location.pathname;
            userId = userId.replace("/anonDashboard/", "");
            userId = userId.replace("/anonDashboard", "");
            setUserID(userId);
            if (userID != "")
            {
                await fetch('http://localhost:4000/api/volunteer/' + userId)
                .then(res => res.json())
                .then(data => setUser(data));
            }
        }
        fetchMyAPI()
        }, []);


    if (user?.firstName) {
        console.log(user);
        return <Redirect from="/anonDashboard/" to='/authDashboard/'/>;
    }
    else 
    {
        return (
            
            <section>
                <div>
                    {user?.firstName && <Redirect from="/anonDashboard/:id" to='/authDashboard/:id'/>}
                    {console.log(user)}
                </div>
                <DashboardHeader />
                <About />
                <Opportuntites />
            </section>
        );
    }
    
}

export default AnonymousDashboard;