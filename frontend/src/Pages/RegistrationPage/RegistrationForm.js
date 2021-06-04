
import './RegistrationForm.css';
import NavBar from '../../Components/NavBar/NavBar'
import Header from "../../Components/Header/Header";
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
import volunteerWaiver from './VolunteerWaiver.pdf'
import jsPDF from 'jspdf'
import ImageUploadMulti from '../../Components/ImageUpload/ImageUploadMulti'

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
        city: "",
        state: "",
        zipcode: "",
        communityRole: [],
        opportunities: {},
        AOI: [],
        experience: "",
        workHistory: "",
        outreach: "",
        boardMember: false,
        signature: false,
        userID: "",
        picture: [],
        signatureValue: "",
        icons: [classroom, event, fundraiser, maintenance, officeAdmin, performance],
        roleOptions: ["Parent", "Community Member", "Student"],
        AOIOptions: ["Classroom", "Event", "Fundraiser", "Maintenance", "Office/Admin", "Performance"],
        redirect: false, 
        reload: false, 
        notValid: false,
        ...props.user 
      };
    
    this.getFileNames = this.getFileNames.bind(this);
    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleStreetAddress = this.handleStreetAddress.bind(this);
    this.handleExperience = this.handleExperience.bind(this);
    this.handleEmployment = this.handleEmployment.bind(this);
    this.handleHearAboutUs = this.handleHearAboutUs.bind(this);
    this.handleSignatureValue = this.handleSignatureValue.bind(this);
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);

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
        this.setState({reload: !this.state.reload});
    }
    else 
    {
      this.setState({userID: this.state._id});
      this.setState({reload: !this.state.reload});
    }
    if (this.state.firstName === "" && userId !== "") 
    {
      this.setState({reload: !this.state.reload});
    }
  }

  /* This lifecycle hook gets executed when the component mounts */
  getFileNames = (files) => {
    this.setState( {picture: 'https://pryac.s3-us-west-1.amazonaws.com/' + files[0] });
  }

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
  // handleAddress(e) {
  //   let value = e.target.value;
  //   this.setState( {address: value} );
  // }
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
  handleSignatureValue(e){
    let value = e.target.value;
    this.setState({signatureValue: value});
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
    const addr = this.state.address +  ", " + this.state.city +  ", " + this.state.state +  " " + this.state.zipcode
    const userdata = {_id: this.state._id, 
      firstName: this.state.firstName, 
      lastName: this.state.lastName, 
      email: this.state.email, 
      phoneNum: this.state.phoneNum, 
      address: addr, 
      communityRole: this.state.communityRole, 
      AOI: this.state.AOI, 
      picture: this.state.picture,
      experience: this.state.experience, 
      workHistory: this.state.workHistory, 
      outreach: this.state.outreach, 
      signature: this.state.signature,
      boardMember: this.state.boardMember,
      opportunities: this.state.opportunities}
    console.log(JSON.stringify(userdata));

    if (userdata.firstName === "" ||
        userdata.lastName === "" ||
        userdata.email === "" ||
        userdata.phoneNum === "" ||
        userdata.address === "" ||
        userdata.signatureValue === "false" ||
        userdata.signature === false)
    {
      this.setState({notValid : true})
    }
    else
    {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/postVolunteer`, {
        method: "POST",
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(userdata)
      }).then(response => {
          response.json().then(data => 
            {
              console.log("Successful" + data);
              this.props.updateProfile(data);
              this.setState({ redirect: true });
        });
      });
    }
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

  onDocumentLoadSuccess({ numPages }) {
    console.log(numPages);
  }

  pdfGenerate=()=>{
    var doc = new jsPDF('landscape', 'px', 'a4', 'false');
    doc.addImage(volunteerWaiver, 'PNG', 65, 20, 500, 400)
    doc.addPage()
    doc.save('volunteerWaiver.pdf')
  }

  handleStreetAddress = (e) => {
    e.preventDefault(); 
    const {name, value} = e.target; 
    switch (name) {
        case "address": 
          this.setState( {address: value} );
            break; 
        case "city": 
          this.setState( {city: value} );
            break; 
        case "state": 
          this.setState( {state: value} );
            break; 
        case "zipcode": 
          this.setState( {zipcode: value} );
            break; 
        default: 
            break; 
        }
}


  render() {
    if (this.state.redirect) {
      return <Redirect to='/registrationConfirmation'/>;
    }
  return (
      <div >
        <Header user={this.state.user}/>
        <body>
            {/* <div id="headerImage"> */}
              <div>
              {/* <img src={headerImage} width= "auto" height="100" alt=""></img> */}
              <h2 className="PRYAheaderTitle">Paso Robles Youth Arts</h2>
            </div>
        </body>
        <div className="title">
            <h1>Join The Team!</h1>
        </div>
        <div className="formWrapper">
          <form className="formStyle">
          <div className="inputStyles">
                <label htmlFor="First Name">First Name<span className="red">*</span></label>
                <input type="text" name="First Name" placeholder="Enter First Name Here" value={this.state.firstName} onChange={this.handleFirst}/>
                <label htmlFor="Last Name">Last Name<span className="red">*</span></label>
                <input type="text" name="Last Name" placeholder="Enter Last Name Here" value={this.state.lastName} onChange={this.handleLast}/>
                <label htmlFor="Email">Email<span className="red">*</span></label>
                <input type="email" name="Email" placeholder="Example@mail.com" value={this.state.email} onChange={this.handleEmail}/>
                <label className="helperText" >*If your email did not autofill, please refresh and try again until it does</label>
                <label htmlFor="Phone">Phone<span className="red">*</span></label>
                <input type="text" name="Phone" placeholder="(XXX) XXX-XXX" value={this.state.phoneNum} onChange={this.handlePhone}/>
                <label htmlFor="Address">Address<span className="red">*</span></label>
                <input type="text" name="address" placeholder="Street Address" value={this.state.address} onChange={this.handleStreetAddress}/>
                <input type="text" name="city" placeholder="City" value={this.state.city} onChange={this.handleStreetAddress}/>
                <input type="text" name="state" placeholder="State" value={this.state.state} onChange={this.handleStreetAddress}/>
                <input type="text" name="zipcode" placeholder="Zip Code" value={this.state.zipcode} onChange={this.handleStreetAddress}/>
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
                <div className="addImages">
                  <label >Profile Picture</label>
                </div>
                <ImageUploadMulti getFiles={this.getFileNames}/>
                <br></br>


                <label className="finalCheckbox">
                    <input type="checkbox" value={ this.state.boardMember } checked= { this.state.boardMember } onChange={this.handleBoardCheckBox}/>
                      <label>I am a Board Member</label>
                </label>
                <br/>                
                <br/>
                <label className="finalCheckbox">
                    <input type="checkbox" value={ this.state.signature } checked= { this.state.signature } onChange={this.handleWaiverCheckBox}/>
                       <label> I agree to the
                    <a id="waiverLink" href={volunteerWaiver} download> digital volunteer waiver</a><span className="red">*</span>
                    </label>
                </label>


                <div id="digitalSignature">
                  <label htmlFor="Address">Digital Signature<span className="red">*</span></label>
                  <input type="text" name="signatureValue" placeholder="Type Name Here" value={this.state.signatureValue} onChange={this.handleSignatureValue}/>
                </div>
                <br/> 
                {this.state.notValid && <label className="errorMessage">* Please Complete Required Fields</label>}
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
