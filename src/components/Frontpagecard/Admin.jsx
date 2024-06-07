import React, { useState, useEffect } from 'react';
import { supabase } from '../api/client';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

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
  if (userInfo?.admin === "no") {
    navigate("/dashboard");
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
    <div>
      <div className="dash1"></div>
      <div className="wr1">
       

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
                 (
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
        

          <div className="dd">
            <button className="out" onClick={signOutUser}>
              SIGN OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
