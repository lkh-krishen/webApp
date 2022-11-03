import styles from '../../assets/css/AddDriver.module.css'
import React, {useState} from "react"
import axios from "axios";


// reactstrap components
import {
  Button,
  Label,
  
  Input,
  
} from "reactstrap";

// core components

export default function AddInspector() {
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [phoneNumber, setPhoneNumber]=useState("");
  const [city, setCity]=useState("");
 


  function sendData(e){
    e.preventDefault();
    
    const newInspector={
     name,
     email,
     phoneNumber,
     city
    }
    
    axios.post("http://localhost:8078/inspectors/add", newInspector).then(()=>{
      alert("Inspector Added");
      window.location.reload();

    }).catch((err)=>{
      alert(err)
    })
  }
  

 
  
  return (
    <>
   
      <div style = {{paddingTop :"50px"}}className ={styles.body} >
      <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Insert Inspector Details</h3><br/><br/>
      <div className = {styles.FormContainer}>    
                
                
                <form onSubmit={sendData} >

                  
                <label for = "name"><h5>Full Name</h5></label>
                  
                    
                  <Input placeholder="Enter Full Name" type="text"  pattern="[A-Za-z]+" 
                  title = "Please Enter Only Capital or Simple Letters, EX : Kanishka Saranga" 
                   required onChange={(e)=>{
                  setName(e.target.value);
                   }} />
                 

                  <label for ="email"><h5>Email</h5></label>
                 
                    
                    <Input placeholder="Enter Email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title = "Enter a valid email" required
                    onChange={(e)=>{
                    setEmail(e.target.value);
                     }}/>
                

                  <label for = "phoneNumber"><h5>Phone Number</h5></label>
                 
                    <Input placeholder="Enter Mobile Number" type="text" pattern = "[0-9]{10}" title = "Enter a 10 digit phone number starting with 0"  required onChange={(e)=>{
                    setPhoneNumber(e.target.value);
                     }}/>
                 

                  <label for ="city"><h5>City</h5></label>
                  
                    
                    <Input placeholder="Enter City" type="text"  pattern="[A-Za-z]+" 
                  title = "Please Enter Only Capital or Simple Letters, EX : Matara"  required
                     onChange={(e)=>{
                    setCity(e.target.value);
                     }}/>
                  

                 
                     <br/>
                 
                  <center>
                  <button type="submit" className="btn btn-primary">Add Inspector</button>
                  </center>
                </form>
                
            
             
        
         
       
      </div>
      </div>

    </>
  );
}
