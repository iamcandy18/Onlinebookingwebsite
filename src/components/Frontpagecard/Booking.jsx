import React from "react";
import { useLocation } from "react-router-dom";


function BookingPage() {
  const location = useLocation();
  const { event } = location.state;

  return (
    <div className="booking-page">
      <div className="event-details">
        <h1>{event.name}</h1>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Price per person:</strong> {event.price}</p>
        <p><strong>Seats Available:</strong> {event.seats}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <button className="book-now">Book Now</button>
      </div>
    </div>
  );
}

export default BookingPage;
