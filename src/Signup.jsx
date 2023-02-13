import React from 'react'
import {useForm} from "react-hook-form"
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data)=>{
    axios({
      method:"post",
      url:"https://webla-api.uc.r.appspot.com/api/v1/users/register",
      data:{
        name:data.name,
        email:data.email,
        password:data.password
      }
    }).then((response)=>{
        console.log(response)
        window.location.href="/"
    }).catch((error)=>{
      console.log(error)
    })

  }
  console.log(errors)
  return (
    <div className='loginContainer'>
      <form onSubmit={handleSubmit(onSubmit)} className="loginClass">
          <h1>Signup Form</h1>
          <input {...register("name")} placeholder="Enter Name" className="form-control" />
          <input {...register("email")} placeholder="Enter Email" className="form-control" />
          <input {...register("password")}placeholder="Enter Password" className="form-control" />
          <input type="submit" className='btn btn-primary'/>
          <small>If you're already existing user? <Link to="/login">Login</Link> here</small>
      </form>
    </div>
  )
}
