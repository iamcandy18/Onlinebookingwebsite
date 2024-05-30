import React, { useEffect, useState } from "react";
import { supabase } from "./api/client";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState({});
const navigate = useNavigate();

useEffect(()=>{
  fetchUser();
},[])

async function fetchUser(){
  const {data} = await supabase
  .from('user')
  .select('*')
  .setUser(data)
  console.log(data)
}


  useEffect(() => {
    async function getUserData() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        if (data?.user) {
          setUser(data.user);
          console.log(data.user.email)
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }
    getUserData();
  }, []);

  
  if (!user.email) {
    navigate("/login");
    return null; 
  }
  async function signOutUser(){
    const {error} = await supabase.auth.signOut();
    navigate("/")
  }

  return (
    <div className="dash">
      <div className="dash1"></div>
      <div>
      <div className="content">
        <i className="fa fa-user-circle fa3" aria-hidden="true"></i>
        <p>Email: {user.email}</p>
      </div>
    <div className="info content">
     
      <h2>Email Verified<i className="fa fa-check" aria-hidden="true"></i></h2>
      <br />
      <h2>Verify your identity</h2>
      <h4>Before you book or host on EveS, you’ll need to complete this step.</h4>
      <button>VERIFY</button>
    </div>
    </div>
    <div className="dd"> <button className="out" onClick={()=>signOutUser()}>SIGN OUT</button></div>
     
    </div>
  );
}

export default Dashboard;
