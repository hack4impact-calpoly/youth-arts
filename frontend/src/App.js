import './App.css';
import NavBar from "./Components/NavBar/NavBar.js"
import Footer from "./Components/Footer/Footer.js"
import SubmitButton from "./Components/SubmitButton/SubmitButton"
import OpportunityCard from "./Components/OpportunityCard/OpportunityCard"
import React, {useState} from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");

  function onClick() {
    setHeadingText("Submitted");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{headingText}</h1>
        <SubmitButton 
          onClick={onClick}
          buttonText="SIGN UP"
        />
        <br></br>
        <OpportunityCard 
          title="Opportunity Title"
          icon="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUVFRUXFxUVFRUVFRUVFRUWFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDw0NDisZFRkrKystLTctLS0tLS0rLSstNystNzcrKy0rLTctLS0tNy0tLSsrLS0rLTctLS03Ky0rK//AABEIAOEA4QMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EAB0QAQEBAAICAwAAAAAAAAAAAAABERKRQYECIWH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APH9TU0AKgC6WgBoaAaaixQNNQF1UgCiQoKalNBpEiyAsIRaByLUi0F5DKwFlXUNBdGMUGBF1ATTQFEgARUAVFUQoALAABQGYqaCqALIQAUqALCCQFVIUAQBlCiCLhAAWoC6gAGmgAi6oKACoAUhABYQAxSFAqooAagLFxmKBgAOYEQRcKoCAABgBQANCqKUAUgQEABYGICrGcWAqs61ASKmAKrMUBTiA54iiCAACoBCKkAAwBagooiwAEgKCghVSgspAgKuJhoNIrINCSiDWjOqDnUgUCrKyQFIIC0KQALABUwBQFCioCKYAIoAoAsEi2gqasSgKiwGuhkBjUoIBQ0DEXQEioQCVYiwC1UMUU0IgUIVRKACriLQRYEgLiCgFNAI1GZGqACg4lKiABABUAAAAAiwFF1ABSgAgUCLEaA1Yw1KCrqQ0AIoItolBelTiIOS0KAilAQMBUAACUCrqEUWFE0GiIAqEKCiLAFokBqVNRZQWKkAKUkIBoaA5mlMQAhgAAAJAWIChFgYChqAoAKhQBcTVBFABWVBopAAiRoEDBBzoqAioUBQBBaQECkUUNANVFARYgLBIqAqVVA1AFCkAq0AIqQtBrf0TAGEBBKLUAAAWRCAWkKmKNCFBYABQQBqMrKCrKzVoBAAqxJFAUKAGgLoaA5FBBRIUAAAKKJGmVBbEVICgAWmhgGGJFoKJAFgAKCAsLAgKqANehPsByMDUClADRFBAVRFTSgsEIDQIAomAoigYolAWJKSgoigosAFhADAUHFIoBEUQKeFAZICgUAVFAFoAJABasQAWADNPiANNQEFiTyCjTQAAA//2Q=="
          location="Location"
          desc="aslkjdfhlasasdkjf;alskdjf;alksdjf;alksjdf;laksjdfklasjdfhlajksdfhlakjsdfhldjksjdfhadj"
          details="d"
        />
      </header>
    </div>
  );
}

export default App;