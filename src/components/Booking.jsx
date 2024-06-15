import React, { useState } from "react";
import { useLocation } from "react-router-dom";


function BookingPage() {
  const location = useLocation();
  const { event } = location.state;
  const [seat_book,setSeat_book]=useState(0);

  const increaseSeat = () => {
    if(seat_book<event.seats){
    setSeat_book(seat_book + 1);}
    addname();
  };

  const decreaseSeat = () => {
    if (seat_book > 0 )  {
      setSeat_book(seat_book - 1);
    }
  };


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
<div>
        <button className="out"><i class="fa fa-minus whitex" onClick={decreaseSeat} aria-hidden="true"></i></button>
        {seat_book?seat_book:"Add seats"}
        <button className="out"><i class="fa fa-plus x" aria-hidden="true" onClick={increaseSeat}></i></button>
        <div>
        <div>
        {Array.from({ length: seat_book }, (_, index) => (
        <div key={index}>
          <input type="text" id={`add-attendee-${index}`} />
          <label htmlFor={`add-attendee-${index}`}>Add Attendee {index + 1}</label>
        </div>
      ))}
</div>
</div>
        </div>
        <button className="out" >Book Now</button>
        
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
