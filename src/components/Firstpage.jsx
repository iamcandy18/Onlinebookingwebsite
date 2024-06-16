import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import EventCard from "./Frontpagecard/Eventcard";
import Footer from "./Footer";
import { supabase } from "./api/client";

function Firstpage() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      let { data: events, error } = await supabase
        .from('events')
        .select('*');
      if (error) throw error;
      setEvents(events);
    } catch (error) {
      console.log('Error fetching events:', error.message);
    }
  }

  async function fetchImageUrls() {
    try {
      const { data, error } = await supabase
        .from('images') 
        .select('url');
      if (error) throw error;

      const urls = data.map(image => image.url);
      console.log('Fetched image URLs:', urls); // Add log
      setImages(urls);
    } catch (error) {
      console.error('Error fetching image URLs:', error.message);
    }
  }

  useEffect(() => {
    fetchImageUrls();
  }, []);

  useEffect(() => {
    async function getUserData() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
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
          if (error) throw error;
          setUserInfo(data);
        } catch (error) {
          console.error('Error fetching user info:', error.message);
        }
      }
    }
    fetchUserInfo();
  }, [user]);

  

  const changecardimages = (text) => {
    setText(text);
  };

  return (
    <div>
      <div className="header-banner"></div>
<div className="flexx">
      <div className="wrapper">

        <div className="user-greeting">
          {userInfo ? (
            <Link to="/dashboard">
              <h2 className="hello-message">Hello, {userInfo.name}</h2>
            </Link>
          ) : (
            <div className="placeholder"></div>
          )}
        </div>

        <Carousel>
          {images.map((url, index) => (
            <div key={index}>
              <img src={url} alt={`Slide ${index}`} />
            </div>
          ))}
        </Carousel>

        <div className="home-section">
          <h1>Upcoming Events</h1>

          <div className="event-list">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Firstpage;
