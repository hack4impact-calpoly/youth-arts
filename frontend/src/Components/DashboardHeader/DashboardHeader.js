import "./DashboardHeader.css";
import SubmitButton from "./../SubmitButton/SubmitButton";
import Slideshow from "../Slideshow/Slideshow";
import DashboardHeaderContext from "../DashboardHeaderContext/DashboardHeaderContext";

function DashboardHeader() {
    return (
        <div className="header">
            <Slideshow />
            <DashboardHeaderContext />
        </div>
    )
}

export default DashboardHeader;