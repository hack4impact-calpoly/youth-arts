import './App.css';
import NavBar from "./Components/NavBar/NavBar.js"
import Footer from "./Components/Footer/Footer.js"
import AnonymousDashboard from "./Pages/AnonymousDashboard/AnonymousDashboard";

function App() {
  return (
    <div className="App">
      <NavBar />
        <AnonymousDashboard />
      <Footer />
    </div>
  );
}

export default App;