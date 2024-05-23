import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
function Login() {



const [data,setData]= useState({
email:"", password:""
})

function handleChange(event){
  setData((e)=>{
    return{
      ...e,
      [event.target.name]:event.target.value
    }
  })
}
  return (
    <div>
      <div className="loginbox">
      <div className="loginbox2">
        LOGIN HERE
        <form >
          <input type="email" name='email' placeholder="Enter Your Email" className="log" onChange={handleChange}/>
          <input type="password" name='password' placeholder="Enter Your Password" className="log" onChange={handleChange}/>
          <button className='submit' type="sumbit">Submit</button>
        </form>
        Not Registered Yet?
        <br />

        <Link Path to='/Register' className='log1'>
        Create an Account
</Link></div>
      </div>
    </div>
  );
}

export default Login;
