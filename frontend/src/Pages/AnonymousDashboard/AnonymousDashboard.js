import "./AnonymousDashboard.css";
import DashboardHeader from "./../../Components/DashboardHeader/DashboardHeader";
import About from "./../../Components/About/About";
import Opportuntites from "./../../Components/Opportunities/Opportunities";

function AnonymousDashboard(props) {
    return (
        <section>
            <DashboardHeader />
            <About />
            <Opportuntites />
        </section>
    );
}

export default AnonymousDashboard;
