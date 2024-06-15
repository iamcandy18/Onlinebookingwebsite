import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './BookingPage.css'; 

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
  
    <div >
      
      <div className="dash"></div>

      <div className="booking-page">
        <div className="opac">

          <div>
        <h1 >{event.name}</h1>
        </div>

<div className="main">
<div>
        <img src={event.img} alt="" srcset="" />
</div>
<div className="mid-book">
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Price per person:</strong> {event.price}</p>
        <p><strong>Seats Available:</strong> {event.seats}</p>
        <p><strong>Description:</strong> {event.description}</p>
</div>
</div>
<div className="flex">
        <button ><i className="fa fa-minus" onClick={decreaseSeat} aria-hidden="true"></i></button>
        <p> {seat_book?seat_book:"Add seats"} </p>
        <button ><i className="fa fa-plus" aria-hidden="true" onClick={increaseSeat}></i></button>
       
        </div>
        <div className="att">
        {Array.from({ length: seat_book }, (_, index) => (
        <div key={index} className="in">
          <input type="text" id={`add-attendee-${index}`} />
          <label htmlFor={`add-attendee-${index}`}>Add Attendee {index + 1}</label>
        </div>
      ))}
</div>
<button className="book" >Book Now</button>
     </div>
</div>
       
     
    </div>
  );
}

export default BookingPage;
