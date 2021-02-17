
import './RegistrationForm.css';
import NavBar from '../../Components/NavBar/NavBar'
import React, {useState} from 'react';
import Office from './icons/001-work-space.png';
import Fundraiser from './icons/002-fundraiser.png';
import Theater from './icons/005-theater.png';
import Committee from './icons/004-committee.png';
import Class from './icons/006-paint-class.png';
import Facility from './icons/003-facility.png';
import Lobby from './icons/reception.png';
import User from './icons/user.png';
import headerImage from './headerImage.png';
import Footer from '../../Components/Footer/Footer';
import SubmitButton from '../../Components/SubmitButton/SubmitButton'

function RegistrationPage() {


  function onClick() {
    //Add transition 
  }
  return (
      <div >
        <NavBar/>
        <body>
            <div id="headerImage">
              <img src={headerImage} width= "auto" height="100" alt=""></img>
            </div>
        </body>
        <div className="title">
            <h1>Join The Team!</h1>
        </div>
        <div className="formWrapper">
          <form className="formStyle">
          <div className="inputStyles">
                <label htmlFor="First Name">First Name</label>
                <input type="text" name="First Name" placeholder="Enter First Name Here"/>
                <label htmlFor="Last Name">Last Name</label>
                <input type="text" name="First Name" placeholder="Enter Last Name Here"/>
                <label htmlFor="Email">Email</label>
                <input type="email" name="Email" placeholder="Example@mail.com"/>
                <label htmlFor="Phone">Phone</label>
                <input type="text" name="Phone" placeholder="(XXX) XXX-XXX"/>
                <label htmlFor="Address">Address</label>
                <input type="text" name="Address" placeholder="Street Addess"/>
                <div className="city">
                    <input type="text" name="City" placeholder="City"/>
                </div>
          </div> 
          <div className="addressBoxes">
                <input type="text" name="State" placeholder="State"/>
                <input type="text" name="Zip" placeholder="Zip"/>
          </div>
            <br/>
            <br/>
            <legend className="legendStyle">I Am A:</legend> 
                <div className="fieldSet">     
                      <label>
                        <input type="checkbox" value="Parent"/>
                        Parent
                      </label>
                      <label>
                        <input type="checkbox" value="CommunityMember"/>
                        Community Member 
                      </label>
                      <label>
                        <input type="checkbox" value="Student"/>
                        Student
                      </label>
                </div> 
              <br/>
             <legend className="legendStyle">Areas Of Interest: </legend> 
              <div className="fieldSet">     
                      <label>
                        <img src={Office} width= "auto" height="20" alt=""></img>
                        <input type="checkbox" value="Office/Admin"/>
                        Office / Admin
                      </label>
                      <label>
                        <img src={Lobby} width= "auto" height="20" alt=""></img>
                        <input type="checkbox" value="LobbyHelp"/>
                        Lobby Help (Docents / COVID Check-in)
                      </label>
                      <label>
                        <img src={Facility} width= "auto" height="20" alt=""></img>
                        <input type="checkbox" value="Facility/Maintenance"/>
                        Facility / Maintenance
                      </label>
                      <label>
                        <img src={Fundraiser} width= "auto" height="20" alt=""></img>
                        <input type="checkbox" value="Fundraiser"/>
                        Fundraiser
                      </label>
                      <label>
                        <img src={Theater} width= "auto" height="20" alt=""></img>
                        <input type="checkbox" value="Performances"/>
                        Performances
                      </label>
                      <label>
                        <img src={Committee} width= "auto" height="20" alt=""></img>
                        <input type="checkbox" value="Committees"/>
                        Committees
                      </label>
                      <label>
                        <img src={Class} width= "auto" height="20" alt=""></img>
                        <input type="checkbox" value="Classroom"/>
                        Classroom
                      </label>
                      <label>
                      <img src={User} width= "auto" height="20" alt=""></img>
                        <input type="checkbox" value="21+"/>
                        21+
                      </label>
              </div>               
                <br/>
                <div className="textStyle">
                  <label htmlFor="VolunteerExperience">Volunteer Experience</label>
                  <textarea placeholder="Tell us about your volunteer experience"/>
                  <br/>
                  <label htmlFor="EmploymentHistory">Employment History</label>
                  <textarea placeholder="Give us an oveview of your employment"/>
                  <br/>
                  <label htmlFor="HowDidYouHearAboutUS">How Did You Hear About Us?</label>
                  <textarea placeholder="Let us know how you found us"/>
                </div>
                <br/>
                <label>
                    <input type="checkbox"/>
                      I agree to the digital volunteer waiver
                </label>
                <br/>                
                <br/>
                <div className="buttonStyle">
                  <SubmitButton onClick={onClick} buttonText="Register Now"/>
                </div>
          </form>
        </div>
        <div className="iconRef">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik </a> 
                from  <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </div>
  );
}

export default RegistrationPage;
