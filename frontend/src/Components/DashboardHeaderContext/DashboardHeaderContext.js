import "./DashboardHeaderContext.css";
import SubmitButton from "./../SubmitButton/SubmitButton";
import logo from "./../../Images/PRYAC_mark.png";
import { useHistory } from "react-router-dom";

function DashboardHeaderContext () {
    const history = useHistory();
    const navigateTo = () => history.push('/Login');

    return (
        <div className="context">
            <img className="logoDashboard" src={logo} alt="logo"/>
            <h1 className="orgSlogan">MAKE A DIFFERENCE TODAY!</h1>
            <h3 className="orgTitle">PASO ROBLES YOUTH ARTS CENTER</h3>
            <h3 className="orgTitle">
            <section className="buttons">
                <SubmitButton onClick={navigateTo} buttonText="REGISTER"/>
                <SubmitButton onClick={navigateTo} buttonText="LOG IN"/>
            </section>
            </h3>
        </div>
    )
}

export default DashboardHeaderContext;