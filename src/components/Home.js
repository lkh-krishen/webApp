import React from "react";
import driverStyles from "../assets/css/DriverDetails.module.css";
import {

    Container
  } from "reactstrap";



function Home() {
 


 

  
  return (
    <>
     
      <Container>
      <div className={driverStyles.viewdriverDiv} >
        <center><h2 className={driverStyles.header}>Ticketing System</h2></center>
       

      </div>
      
      </Container>
     
    </>
  );
}

export default Home;
