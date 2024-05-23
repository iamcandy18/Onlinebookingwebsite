import { supabase } from "../client";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Register() {

    const [data,setData]= useState({
        username:"",email:"", password:""
        })
        
        function handleChange(event){
          setData((e)=>{
            return{
              ...e,
              [event.target.name]:event.target.value
            }
          })
        }
        async function handleSubmit(e){
            
try{
            const { data, error } = await supabase.auth.signUp({
              email: data.email,
              password: data.password,
              option:{
                data:{
                  username:data.username,
                }
              }
            })
            alert("CHECK YOUR EMAIL");
        }catch(error){
            alert(error)
        }
            }


  return (
    <div>
      <div className="loginbox">
      <div className="loginbox2">
        REGISTER NOW
        <form onSubmit={handleSubmit}>

          <input type="username" name='username' placeholder="Enter Username" className="log" onChange={handleChange}/>
          <input type="email" name='email'  placeholder="Enter Your Email" className="log" onChange={handleChange}/>
          <input type="password" name='password' placeholder="Enter Your Password" className="log" onChange={handleChange}/>
          <button className='submit' type="sumbit">Submit</button>
        </form>
        Already have an account?
        <br />
       
        <Link path to='/login' className='log1'>
Login Here
</Link>

</div>
      </div>
    </div>
  )
}

export default Register
