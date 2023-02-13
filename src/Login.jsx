import React from 'react'
import { Link } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import "./Login.css"
import axios from 'axios';

const schema = yup.object({
  email: yup.string().required().min(5).max(40),
  password: yup.string().required().min(6).max(20),
}).required();

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver:yupResolver(schema)
  });

  const onSubmit = (data) => {
    axios({
      method:"POST",
      url:"https://webla-api.uc.r.appspot.com/api/v1/users/login",
      data:{
        email:data.email,
        password:data.password
      }

    }).then((response)=>{
      console.log(response)
      localStorage.setItem("SHOPPING_TOKEN",response.data.token)
      localStorage.setItem("SHOPPING_CART_ID",response.data.cart_id)
      window.location.href="/home"
    }).catch((error)=>{
      console.log("error")
    })
  }

  console.log(errors)
  return (
    <div className='loginContainer'>
      <form onSubmit={handleSubmit(onSubmit)} className="loginClass">
          <h1>Login</h1>
          <div className='form-group'>
          <input {...register("email",{ required: true })} placeholder="Enter Email" type="email" class="form-control"/>
          <small className='form-text text-danger'>{errors['email']?.message}</small> 
          </div>
          <div className='form-group'>
          <input {...register("password",{required:true})}placeholder="Enter Password" type="text" class="form-control" />

          <small className='form-text text-danger'>{errors['password']?.message}</small> 
          </div>
          

          <input type="submit" className='btn btn-primary' />
          <small>Don't have account? <Link to="/signup">SignUp</Link> here</small>
      </form>
    </div>
  )
}
