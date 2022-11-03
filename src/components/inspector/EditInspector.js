import styles from '../../assets/css/AddDriver.module.css'
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router';

import{
    Label,
    Input,
    Button 
}
from 'reactstrap'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { thisExpression } from '@babel/types';
import { ClickAwayListener } from '@material-ui/core';

toast.configure();

function EditInspector(){

 



    
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city , setCity] = useState("");
    const [message , setMessage] = useState("");
   

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8078/inspectors/${id}`).then((res) =>{

        console.log(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhoneNumber(res.data.phoneNumber);
        setCity(res.data.city);

        }).catch((err)=>{
        console.log(err);
        })
    } , []);

    function onSubmit (e){
        e.preventDefault();

        const updateInspector = {
           name,
            email,
            phoneNumber,
            city
        }
        axios.put(`http://localhost:8078/inspectors/update/${id}` , updateInspector ).then(() =>{
            
            toast.success('Inspector Updated!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                e.target.reset();
                

        }).catch((err) =>{
            console.log(err);
            toast.error('Something went  wrong!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }
    return(

        <div>
           
            <div style = {{paddingTop :"50px"}} className ={styles.body}>
            <br/><br/><h3 className={styles.header} style = {{textAlign : 'center'}}>Update Inspector Details</h3><br/><br/>
            <div className = {styles.FormContainer}>
            <form onSubmit = {onSubmit}>

                <Label for = "name">Full Name</Label><br/>
                <Input type = 'text'   title = "Please Enter Only Capital or Simple Letters, EX : Kanishka Saranga" required
                name = "name" value = {name}
                onChange = {(e) =>{
                    setName(e.target.value);
                }}></Input><br/>


                <Label for = "email">Email</Label><br/>
                <Input type = "email" name = "Email" value = {email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title = "Enter a valid email" required
                onChange = {(e) =>{
                    setEmail(e.target.value);
                }}></Input><br/>

                <Label for = "phoneNumber">Phone number</Label><br/>
                <Input type = "number" name = "phoneNumber" value = {phoneNumber} pattern = "[0-9]{10}" title = "Enter a 10 digit phone number starting with 0"
                onChange = {(e)=>{
                    setPhoneNumber(e.target.value);
                }}></Input><br/>

                <Label for = "city">City</Label><br/>
                <Input type = "text" name = "city" value = {city} pattern="[A-Za-z]+" 
                 title = "Please Enter Only Capital or Simple Letters, EX : Matara"  required
                onChange = {(e) =>{
                    setCity(e.target.value);
                }}/><br/>

              

                
                <Button type = "submit" color = "warning" style = {{float:'right' , margin : "5px" }} 

                >Edit Inspector</Button>

            </form>    
            </div>
            
        </div>   
        </div>

    );
}

export default EditInspector;