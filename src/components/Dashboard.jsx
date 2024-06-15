import React, { useEffect, useState } from "react";
import { supabase } from "./api/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Dashboard.css'; 

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
          .select('id, user_email, event_name, event_date, event_location, ticket_number, etime')
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

  const cancelBooking = async (bookingId) => {
    try {
      const { error } = await supabase
        .from('booking')
        .delete()
        .eq('id', bookingId);
      if (error) {
        throw error;
      }
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
      alert('Booking canceled successfully');
    } catch (error) {
      console.error('Error canceling booking:', error.message);
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
          <button className="btn-bookings">Your Present Bookings</button>
          <p>Tap to know the ticket number or cancel your booking</p>
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Date</th>
                <th>Time</th>
                <th>Event</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => 
                booking.user_email === user.email && (
                  <tr key={booking.id}>
                    <td>{booking.user_email}</td>
                    <td>{booking.event_date}</td>
                    <td>{booking.etime}</td>
                    <td>{booking.event_name}</td>
                    <td>{booking.event_location}</td>
                    <td>
                      <div className="actions">
                        <button className="btn-action" onClick={() => alert(`Ticket Number: ${booking.ticket_number}`)}>
                          Ticket Number
                        </button>
                        <button className="btn-action" onClick={() => cancelBooking(booking.id)}>
                          Cancel
                        </button>
                      </div>
                    </td>
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
