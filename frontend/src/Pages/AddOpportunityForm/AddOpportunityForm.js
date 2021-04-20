
import './AddOpportunityForm.css';
import NavBar from '../../Components/NavBar/NavBar'
import React, {useState} from 'react';
import Footer from '../../Components/Footer/Footer';
import SubmitButton from '../../Components/SubmitButton/SubmitButton'
import ImageUpload from '../../Components/ImageUpload/ImageUpload'

function RegistrationPage() {


  function onClick() {
    //Add transition 
  }

  const [taskList, setTaskList] = useState([
        {task: ""}
    ]);

  const [wishList, setWishList] = useState([
        {wishItem: ""}
    ]);

  const handleChangeTask = (e, index) => {
    const {name, value} = e.target; 
    const list = [...taskList];
    list[index][name] = value;
    setTaskList(list);
  }

  const handleAddInputTask = () => {
      const list = [...taskList];
      list.push({task:""});
      setTaskList(list)
  }

  const handleDeleteInputTask = index  => {
    const list = [...taskList];
    list.splice(index, 1);
    setTaskList(list)
}

const handleChangeWishList = (e, index) => {
    const {name, value} = e.target; 
    const list = [...wishList];
    list[index][name] = value;
    setWishList(list);
  }

const handleAddInputWish = () => {
    const list = [...wishList];
    list.push({wishItem:""});
    setWishList(list)
}

const handleDeleteInputWish = index  => {
  const list = [...wishList];
  list.splice(index, 1);
  setWishList(list)
}

  return (
      <div >
        <NavBar/>
        <body>
        </body>
        <div className="title">
            <h1>Create Opportunity</h1>
        </div>
        <div className="formWrapper">
          <form className="formStyle">
          <div className="inputStyles">
                <label htmlFor="OpportunityTitle">Opportunity Title</label>
                <input type="text" name="OpportunityTitle" placeholder="Enter Opportunity Title Here"/>
                <label htmlFor="OpportunityTitle">Opportunity Date</label>
                <input type="text" name="OpportunityDate" placeholder="MM/DD/YYYY"/>
                <label htmlFor="OpportunityTitle">Opportunity Time</label>
                <input type="text" name="OpportunityTime" placeholder="HH:MM"/>
          </div> 
          <div className="inputStyles">
            <label htmlFor="tasks">Volunteer Tasks</label>
          </div>
            {taskList.map((item, i) => {
                  return(
                    <div key={i}>
                        <div className="inputButtons" >
                            <input id="taskInput" type="text" name="task" 
                            placeholder="Enter Custom Volunteer Task"
                            value = {item.task}
                            onChange={e => handleChangeTask(e, i)}/>
                            {taskList.length !== 1 &&
                                <input id="deleteItem" type="button" value="X" onClick={() => handleDeleteInputTask(i)}/>
                            }
                        </div>
                        {taskList.length -1 === i && 
                           <input id="addItem" type="button" 
                           value="Add Task" onClick={handleAddInputTask}/>
                        }
                    </div>
                  )
              })}
              <div className="inputStyles">
                <label htmlFor="wishlist">Wish List Items</label>
             </div>
               {wishList.map((item, i) => {
                  return(
                    <div key={i}>
                        <div className="inputButtons" >
                            <input id="taskInput" type="text" name="wishItem" placeholder="Enter Wish List Item"
                            value = {item.wishItem}
                            onChange={e => handleChangeWishList(e, i)}/>
                            {wishList.length !== 1 &&
                                <input id="deleteItem" type="button" value="X" onClick={() => handleDeleteInputWish(i)}/>

                            }
                        </div>
                        {wishList.length -1 === i && 
                           <input id="addItem" type="button" value="Add Item" onClick={handleAddInputWish}/>
                        }
                    </div>
                  )
              })}
              
          <div className="textStyle">
                <label htmlFor="OpportunityDescription">Opportunity Description</label>
                <textarea placeholder="Enter description of opportunity"/>
                <br/>
                <label htmlFor="Skill/Interests">Skills/Interests</label>
                <textarea placeholder="Enter skills and interests for opportunity"/>
                <br/>
          </div>
          <div className="addImages">
             <label >Add Images</label>
          </div>
          <br/>
          <ImageUpload/>
           <br/>         
                <div className="buttonStyle">
                  <SubmitButton onClick={onClick} buttonText="Submit"/>
                </div>
          </form>
        </div>
        <div className="footer">
            <Footer/>
        </div>
      </div>
  );
}

export default RegistrationPage;
