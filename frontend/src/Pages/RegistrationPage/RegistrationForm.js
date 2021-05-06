
import './RegistrationForm.css';
import NavBar from '../../Components/NavBar/NavBar'
import React from 'react';
import headerImage from './headerImage.png';
import SubmitButton from '../../Components/SubmitButton/SubmitButton'
import classroom from '../../Images/classroom.png'
import event from '../../Images/event.png'
import fundraiser from '../../Images/fundraiser.png'
import maintenance from '../../Images/maintenance.png'
import officeAdmin from '../../Images/office-admin.png'
import performance from '../../Images/performance.png'
import { Redirect } from 'react-router-dom'


class RegistrationPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNum: "",
        address: "",
        communityRole: [],
        AOI: [],
        experience: "",
        workHistory: "",
        outreach: "",
        boardMember: false,
        signature: false,
        userID: "",
        icons: [classroom, event, fundraiser, maintenance, officeAdmin, performance],
        roleOptions: ["Parent", "Community Member", "Student"],
        AOIOptions: ["Classroom", "Event", "Fundraiser", "Maintenance", "Office/Admin", "Performance"],
        redirect: false, 
        ...props.user 
      };
    
    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleExperience = this.handleExperience.bind(this);
    this.handleEmployment = this.handleEmployment.bind(this);
    this.handleHearAboutUs = this.handleHearAboutUs.bind(this);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleRoleCheckBox = this.handleRoleCheckBox.bind(this);
    this.handleAOICheckBox = this.handleAOICheckBox.bind(this);
    this.handleWaiverCheckBox = this.handleWaiverCheckBox.bind(this);
    this.handleBoardCheckBox = this.handleBoardCheckBox.bind(this);
    
  }
  componentDidMount()
  {
    let userId = window.location.pathname;
    userId = userId.replace("/registration/", "");
    if (this.state.firstName === "" && userId !== "") 
    {
      this.setState({userID: userId});
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/volunteer/` + userId, { credentials: 'include' })
        .then(res => res.json())
        .then(data => this.setState({...data}));
    }
    else 
    {
      this.setState({userID: this.state._id});
    }
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleFirst(e) {
    let value = e.target.value;
    this.setState( {firstName: value} );
  }
  handleLast(e) {
    let value = e.target.value;
    this.setState( {lastName: value} );
  }
  handleEmail(e) {
    let value = e.target.value;
    this.setState( {email: value} );
  }
  handlePhone(e) {
    let value = e.target.value;
    this.setState( {phoneNum: value} );
  }
  handleAddress(e) {
    let value = e.target.value;
    this.setState( {address: value} );
  }
  handleExperience(e) {
    let value = e.target.value;
    this.setState( {experience: value} );
  }
  handleEmployment(e) {
    let value = e.target.value;
    this.setState( {workHistory: value} );
  }
  handleHearAboutUs(e) {
    let value = e.target.value;
    this.setState( {outreach: value} );
  }
  
  handleRoleCheckBox(e) {
    const newSelection = e.target.value;
    let newSelectionArray;

    if (this.state.communityRole.indexOf(newSelection) !== -1) {
      newSelectionArray = this.state.communityRole.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.communityRole, newSelection];
    }
    this.setState( {communityRole: newSelectionArray });
  }
  handleAOICheckBox(e) {
    const newSelection = e.target.value;
    let newSelectionArray;

    if (this.state.AOI.indexOf(newSelection) !== -1) {
      newSelectionArray = this.state.AOI.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.AOI, newSelection];
    }
    this.setState( {AOI: newSelectionArray });
  }
  handleWaiverCheckBox(e) {
    if (this.state.signature !== true) {
      this.setState( {signature: true });
    } else {
      this.setState( {signature: false });
    }
  }
  handleBoardCheckBox(e) {
    if (this.state.boardMember !== true) {
      this.setState( {boardMember: true });
    } else {
      this.setState( {boardMember: false });
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const userdata = {_id: this.state._id, 
      firstName: this.state.firstName, 
      lastName: this.state.lastName, 
      email: this.state.email, 
      phoneNum: this.state.phoneNum, 
      address: this.state.address, 
      communityRole: this.state.communityRole, 
      AOI: this.state.AOI, 
      experience: this.state.experience, 
      workHistory: this.state.workHistory, 
      outreach: this.state.outreach, 
      signature: this.state.signature,
      boardMember: this.state.boardMember}
    console.log(JSON.stringify(userdata));
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/postVolunteer/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(userdata)
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
        this.setState({ redirect: true })
      });
    });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newUser: {
        name: "",
        age: "",
        gender: "",
        skills: [],
        about: ""
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/registrationConfirmation'/>;
    }
  return (
      <div >
        <NavBar user={this.state.user}/>
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
                <input type="text" name="First Name" placeholder="Enter First Name Here" value={this.state.firstName} onChange={this.handleFirst}/>
                <label htmlFor="Last Name">Last Name</label>
                <input type="text" name="Last Name" placeholder="Enter Last Name Here" value={this.state.lastName} onChange={this.handleLast}/>
                <label htmlFor="Email">Email</label>
                <input type="email" name="Email" placeholder="Example@mail.com" value={this.state.email} onChange={this.handleEmail}/>
                <label htmlFor="Phone">Phone</label>
                <input type="text" name="Phone" placeholder="(XXX) XXX-XXX" value={this.state.phoneNum} onChange={this.handlePhone}/>
                <label htmlFor="Address">Address</label>
                <input type="text" name="Address" placeholder="Address" value={this.state.address} onChange={this.handleAddress}/>
          </div> 
            <br/>
            <br/>
            <div>
            <legend className="legendStyle">I Am A:</legend> 
              <div className="fieldSet">
                {this.state.roleOptions.map(option => {
                  return (
                    <label key={option}>
                      <input
                        className="form-checkbox"
                        onChange={this.handleRoleCheckBox}
                        value={option}
                        checked= { this.state.communityRole.indexOf(option) !== -1 }
                        type="checkbox" /> {option}
                    </label>
                  );
                })}
              </div>
            </div>
              <br/>
            <div>
            <legend className="legendStyle">Areas Of Interest: </legend> 
                <div className="fieldSet">
                  {this.state.AOIOptions.map(option => {
                    return (
                      <label key={option}>
                        <img src={(this.state.icons)[this.state.AOIOptions.indexOf(option)]} width= "auto" height="30" alt=""></img>
                        <input
                          className="form-checkbox"
                          onChange={this.handleAOICheckBox}
                          value={option}
                          checked= { this.state.AOI.indexOf(option) !== -1 }
                          type="checkbox" /> {option}
                      </label>
                    );
                  })}
                </div>
              </div>
                <br/>
                <div className="textStyle"> 
                  <label htmlFor="VolunteerExperience">Volunteer Experience</label>
                  <textarea placeholder="Tell us about your volunteer experience" value={this.state.experience} onChange={this.handleExperience}/>
                  <br/>
                  <label htmlFor="EmploymentHistory">Employment History</label>
                  <textarea placeholder="Give us an oveview of your employment" value={this.state.workHistory} onChange={this.handleEmployment}/>
                  <br/>
                  <label htmlFor="HowDidYouHearAboutUS">How Did You Hear About Us?</label>
                  <textarea placeholder="Let us know how you found us" value={this.state.outreach} onChange={this.handleHearAboutUs}/>
                </div>
                <br/>
                <label>
                    <input type="checkbox" value={ this.state.boardMember } checked= { this.state.boardMember } onChange={this.handleBoardCheckBox}/>
                      I am a Board Member
                </label>
                <br/>                
                <br/>
                <label>
                    <input type="checkbox" value={ this.state.signature } checked= { this.state.signature } onChange={this.handleWaiverCheckBox}/>
                       I agree to the digital volunteer waiver
                </label>
                <br/> 
                <div className="buttonStyle">
                  <SubmitButton onClick={this.handleFormSubmit} buttonText="Register Now"/>
                </div>
          </form>
        </div>
      </div>
  );
}
}


export default RegistrationPage;
