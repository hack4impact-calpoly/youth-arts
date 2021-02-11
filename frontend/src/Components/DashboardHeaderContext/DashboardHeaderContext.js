import "./DashboardHeaderContext.css";
import SubmitButton from "./../SubmitButton/SubmitButton";
import logo from "./../../Images/PRYAC_mark.png";

function DashboardHeaderContext () {
    return (
        <div className="context">
            <img className="logoDashboard" src={logo} alt="logo"/>
            <h1 className="orgSlogan">MAKE A DIFFERENCE TODAY!</h1>
            <h3 className="orgTitle">PASO ROBLES YOUTH ARTS CENTER</h3>
            <section className="buttons">
                <SubmitButton buttonText="REGISTER"/>
                <SubmitButton buttonText="LOG IN"/>
            </section>
        </div>
    )
}

export default DashboardHeaderContext;