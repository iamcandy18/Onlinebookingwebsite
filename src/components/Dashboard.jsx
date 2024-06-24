import React, { useEffect, useState } from "react";
import { supabase } from "./api/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Dashboard.css'; 

function Dashboard() {
  const [user, setUser] = useState(null);
  const [booking, setBooking] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
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
    if (!user) return;
    
    async function fetchUserInfo() {
      try {
        const { data, error } = await supabase
          .from('newusers')
          .select('username, name, admin')
          .eq('email', user.email)
          .single();
        if (error) {
          throw error;
        }
        setUserInfo(data);
        setNameInput(data.name);
      } catch (error) {
        console.error('Error fetching user info:', error.message);
      }
    }
    fetchUserInfo();
  }, [user]);

  
  useEffect(() => {
    if (userInfo?.admin === "yes") {
      navigate("/admin");
    }
  }, [userInfo, navigate]);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      navigate("/login");
    }
  }

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const saveUserInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('newusers')
        .update({ name: nameInput })
        .eq('email', user.email);
      if (error) {
        throw error;
      }
      setUserInfo((prev) => ({ ...prev, name: nameInput }));
      setIsEditing(false);
      console.log('User info saved successfully:', data);
    } catch (error) {
      console.error('Error saving user info:', error.message);
    }
  };

  async function fetchEvents() {
    try {
      const { data, error } = await supabase
        .from("booking")
        .select("*")
        .eq('email', user.email);
      if (error) throw error;
      setBooking(data);
    } catch (error) {
      console.error("Error fetching events:", error.message);
    }
  }

  if (!user) {
    return (
      <>
        <div className="dash"></div>
      <div className="message-pop">
<div>
<h2> NO SESSION FOUND</h2>
  <Link to="/login"><button>SIGN IN</button></Link>
  <Link to="/register"><button >SIGN UP</button></Link>
</div>
      </div>
      </>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header"></div>
      <div className="wrapper">

        <div className="profile">
          <i className="fa fa-user-circle fa-3x" aria-hidden="true"></i>
          {userInfo && (
            <>
              <h4>
                Username: {userInfo.username}
                <br />
                Name: {isEditing ? (
                  <input
                    type="text"
                    value={nameInput}
                    onChange={handleNameChange}
                  />
                ) : (
                  userInfo.name
                )}
                <br />
                Email: {user.email}
              </h4>
              {isEditing ? (
                <button className="btn-save" onClick={saveUserInfo}>
                  Save
                </button>
              ) : (
                <button className="btn-edit" onClick={toggleEditing}>
                  
                    <i className="fa fa-pencil-square-o " aria-hidden="true"></i>
                   
                </button>
              )}
            </>
          )}
           </div>
          <div className="signout">
            <button className="btn-signout" onClick={signOutUser}>
              SIGN OUT
            </button>
          </div>
       

        <div className="bookings">
          
        <div className="events">
        <h3>Present Events</h3>
        {booking.length > 0 ? (
          booking.map((event) => (
            
            <div key={event.id} className="event-card">
              <h4>{event.name}</h4>
              <p>{event.location}</p>
              <p>{event.time}</p>
              <p>{event.date}</p>
              <p>{event.seats}</p>
              <p>{event.price}</p>
              
            </div>
            
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div> 
        </div>
      </div>
   
  );
}

export default Dashboard;
