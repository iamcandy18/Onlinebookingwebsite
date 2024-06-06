import React, { useState } from 'react';
import { supabase } from './api/client';


const Booking = () => {
    const [email, setEmail] = useState('');
    const [event, setEvent] = useState('');
    const [location, setLocation] = useState('');
    const [eventdate, setEventdate] = useState('');

    const [eventtime, setEventtime] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const date = new Date().toISOString().split('T')[0]; 
    const [bool,setBool]=useState(false);
    const generateticket=()=>{
        const pre='TKT'
        const random=Math.floor(1000+Math.random()*10000)
        const time= Date.now()
        return `${pre}${random}${time}`
    }
    const ticket=generateticket();

    const handleBooking = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase
            .from('booking')
            .insert([{ user_email: email, event_name: event , booking_date: date, event_date:eventdate, event_location:location, ticket_number:ticket, etime:eventtime}])
            .select(); 

        if (error) {
            alert(`Error: ${error.message}`);
        } else {
            const booking = data[0];
            alert('Booking successful!');
            setBool(true);
            
        }
        setLoading(false);
    };
    const buttonTexts = [
        { text: 'TREEHOUSE', icon: 'fa-tree' },
        { text: 'WATER PARK', icon: 'fa-ticket' },
        { text: 'BUNJEE JUMPING', icon: 'fa-home' },
        { text: 'LAKE', icon: 'fa-pied-piper' },
        { text: 'AMAZING VIEW', icon: 'fa-window-maximize' },
        { text: 'COUNTRYSIDE', icon: 'fa-globe' },
        { text: 'NATIONAL PARKS', icon: 'fa-envira' },
        { text: 'RESTAURANT', icon: 'fa-cutlery' },
        { text: 'CAFES', icon: 'fa-coffee' },
        { text: 'SNOW PARK', icon: 'fa-cubes' },
        { text: 'FILTERS', icon: 'fa-toggle-on' }
      ];
     
      const buttonLocation = [
        { text: 'Mumbai' },
        { text: 'Delhi' },
        { text: 'Chennai' },
        { text: 'Kolkata' },
        { text: 'Bangalore' },
        { text: 'Hyderabad' },
        { text: 'Pune' },
        { text: 'Ahmedabad' },
        { text: 'Jaipur' },
        { text: 'Lucknow' },
        { text: 'Chandigarh' },
        { text: 'Goa' }
      ];
    
    
  return (
    <div>
        <div className="dash1"></div>
        <div className="wr1">
        <div className="content mid ">
        <form onSubmit={handleBooking}>
              <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
             

             <select
          name="event"
          id="event"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          required
        >
          <option value="" disabled>Select an event</option>
          {buttonTexts.map(({ text }) => (
            <option key={text} value={text}>{text}</option>
          ))}
        </select>

        <select
          name="location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option value="" disabled>Select a Location</option>
          {buttonLocation.map(({ text }) => (
            <option key={text} value={text}>{text}</option>
          ))}
        </select>

        <input type="date" id="dateInput" name="dateInput" min="2024-06-01" max="2024-12-31"
        
        value={eventdate}
          onChange={(e) => setEventdate(e.target.value)}
          required/>
<input type="time" name="time" id="timeinput" value={eventtime}
          onChange={(e) => setEventtime(e.target.value)}
          required />
            
              <button className='out' type="submit" disabled={loading}>
                  {loading ? 'Booking...' : 'Book Ticket'}
              </button>
              {message && <p>{message}</p>}
          </form>
          </div>

          {bool?<h4 className='mid'>CONGRATULATIONS! YOU HAVE BOOKED YOUR TICKET, YOUR TICKET NUMBER {ticket}</h4>:<></>}


          </div>
    </div>
  )
}

export default Booking
