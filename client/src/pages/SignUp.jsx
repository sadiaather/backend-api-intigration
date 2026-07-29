import React from 'react'
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState} from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { GlobalContext } from '../context/context';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

   const notify = () => toast('Account created successfully');
   let {state:{isloggedIn},dispatch}= useContext(GlobalContext);
   const navigate= useNavigate()
  const [formData,setFormData]= useState({
    name :"",
    email:"",
    password:""
  })

  const handleChange = (e)=>{
 setFormData({
  ...formData,
  [e.target.name]:e.target.value 
 })
  }

  const logged = ()=>{
    isloggedIn = true
    dispatch({
        type:"USER-LOGIN",
        payload:{isloggedIn,formData}
    })
  }

  const handleSubmit= async (e)=>{
    e.preventDefault()
    console.log(formData);
    
        try {
              
            let res = await  axios.post("http://localhost:5000/api/auth/signup", JSON.stringify(formData), {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            ).then((res => {
                if (res.data.success) {

                    toast.success("Account created successfully")
                    
                    localStorage.setItem("token", res?.data?.token)
                  
                      navigate("/")

                      logged()
                }
            }))


        } catch (err) {
            console.log(err)
            toast.error("signup failed")
        }
    }
    
  
  return (
    
      <div className='container d-flex  justify-content-center align-items-center vh-100 w-100'>
            <Form className='w-50' >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name='name' onChange={handleChange} />

                </Form.Group>
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

export default SignUp