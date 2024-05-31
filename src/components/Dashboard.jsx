import React, { useEffect, useState } from "react";
import { supabase } from "./api/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        if (data?.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    async function fetchUserInfo() {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('newusers')
            .select('username, name')
            .eq('email', user.email)
            .single();
          if (error) {
            throw error;
          }
          setUserInfo(data);
        } catch (error) {
          console.error('Error fetching user info:', error.message);
        }
      }
    }
    fetchUserInfo();
  }, [user]);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      navigate("/");
    }
  }

  if (!user) {
    return (
      <>
        <div className="dash1"></div>
        <div className="content mid">
          <p>You're not logged in...</p>
          <Link to="/login">
            <button className="out">LOGIN</button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="dash">
      <div className="dash1"></div>
      <div className="wr">
        <div className="content">
          <i className="fa fa-user-circle fa3" aria-hidden="true"></i>
          {userInfo && (
            <>
              <h4>Username: {userInfo.username}
              <br />

              Name: {userInfo.name}
              <br />
              
              Email: {user.email}</h4>
            </>
          )}
          
          
        </div>
        
      </div>
      <div className="prof"></div>
      <div className="dd">
        <button className="out" onClick={signOutUser}>SIGN OUT</button>
      </div>
    </div>
  );
}

export default Dashboard;
