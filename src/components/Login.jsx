import React from 'react'
import { useState } from "react";
import './login.css'

function Login() {

  const [data,setdata]= useState({
    email:" ", password:" "
  })
console.log(data)

  function change(event){
    setdata((prev)=>{
return{
  ...prev,
  [event.target.name]:event.target.value
}
    })
  }

  return (
    <>
      <div><div className="mid">

        <form>

        SIGN IN HERE
          <input type="text" placeholder="  Enter Email" name="email" onChange={change}/>
          <br />
          <input type="text" placeholder="  Enter Password" name="password" onChange={change}/>
          <br />
          <button type="submit">Submit</button>
        </form>
        </div>
      </div>
    </>
  );
}

export default Login;

