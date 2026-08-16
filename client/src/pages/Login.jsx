import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from "react";
import { GlobalContext } from "../context/context.jsx";




const Login = () => {

    
    const { dispatch } = useContext(GlobalContext);


   const notify = () => toast('Account login successfully');
        const navigate = useNavigate();

const [formData,setFormData]= useState({
  email : "",
  password : ""
})

const handleChange = (e)=>{
  setFormData({
...formData,
[e.target.name]:e.target.value
})
console.log(formData);
}

const handleSubmit =(e)=>{
  e.preventDefault()
  console.log(formData);
  try {
             
         let res = axios.post("http://localhost:5000/api/auth/login", JSON.stringify(formData), {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            ).then((res => {

                if (res.data.success) {
            
                    localStorage.setItem("token", res?.data?.token),
                 
                        dispatch({
                               type: "USER_LOGIN",
                              payload:res.data.data // API se jo user data aaya
                  });
                 
                   toast.success("Account login successfully")     
                     navigate("/")
                }
            }))


        } catch (err) {
            console.log(err.message)
        }
    }



  return (
  
        
          <div className='container d-flex  justify-content-center align-items-center vh-100 w-100'>
                <Form className='w-50' >
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange} />
    
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} />
                    </Form.Group>
    
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
        </div>
      
    
  )
}

export default Login