import "./DashboardHeaderContext.css";
import SubmitButton from "./../SubmitButton/SubmitButton";
import logo from "./../../Images/PRYAC_mark.png";

function DashboardHeaderContext () {
    return (
        <div className="context">
            <img className="logo" src={logo} alt="logo"/>
            <h1>MAKE A DIFFERENCE TODAY!</h1>
            <h3>PASO ROBLES YOUTH ARTS CENTER</h3>
            <SubmitButton buttonText="REGISTER"/>
            <SubmitButton buttonText="LOG IN"/>
        </div>
    )
}

export default DashboardHeaderContext;