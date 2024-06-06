import React, { useEffect, useState } from "react";
import { supabase } from "./api/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
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
    if (!user) return;
    
    async function fetchUserBookings() {
      try {
        const { data, error } = await supabase
          .from('booking')
          .select('user_email, event_name, event_date, event_location, ticket_number, etime')
        if (error) {
          throw error;
        }
        setBookings(data);
      } catch (error) {
        console.error('Error fetching user bookings:', error.message);
      }
    }
    fetchUserBookings();
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

  if (!user) {
    return (
      <>
        <div className="dash1"></div>
        <div className="wr1">
          <p className="white">You're not logged in...</p>
          <Link to="/login">
            <button className="out">LOGIN</button>
          </Link>
          <br />
          <Link to="/register">
            <button className="out">SIGN UP</button>
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
                <button className="empty" onClick={saveUserInfo}>
                  Save
                </button>
              ) : (
                <button className="empty" onClick={toggleEditing}>
                  <h5>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    Update
                  </h5>
                </button>
              )}
            </>
          )}
          <div className="dd">
            <button className="out" onClick={signOutUser}>
              SIGN OUT
            </button>
          </div>
        </div>

        <div className="contentx">
          <button className="out1">Your Present Bookings</button>
          <p>Tap to know the ticket number</p>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Date</th>
                <th>Time</th>
                <th>Event</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => 
                booking.user_email === user.email && (
                  <tr key={booking.event_date} onClick={() => alert(`Ticket Number: ${booking.ticket_number}`)}>
                    <td>{booking.user_email}</td>
                    <td>{booking.event_date}</td>
                    <td>{booking.etime}</td>
                    <td>{booking.event_name}</td>
                    <td>{booking.event_location}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
