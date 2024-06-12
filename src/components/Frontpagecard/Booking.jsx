import React from "react";
import { useLocation } from "react-router-dom";


function BookingPage() {
  const location = useLocation();
  const { event } = location.state;

  return (
    <div className="booking-page">
      <div className="dash"></div>
      <div className="event-detailsh">
        <div>
        <h1 className="out">{event.name}</h1>

        <img src={event.img} alt="" srcset="" />
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        </div>
        <div className="o">
          <p></p>
        <p><strong>Price per person:</strong> {event.price}</p>
        <p><strong>Seats Available:</strong> {event.seats}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <button className="out">Book Now</button>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
