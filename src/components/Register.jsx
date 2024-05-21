import React from 'react'
import { useState } from "react";
import './Register.css'

function Register() {

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

        
          <input type="text" placeholder="  Enter Email" name="email" onChange={change}/>
          <br />
          <input type="password" placeholder="  Enter Password" name="password" onChange={change} />
          <br />
        </form>
        </div>
      </div>
    </>
  );
}

export default Register;