import React, { useState, useEffect } from "react";
import { supabase } from "./api/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Admin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState({});
  const [events, setEvents] = useState([]);

  async function fetchRegisteredUsers(eventId) {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("email")
        .eq("event_id", eventId);
      if (error) throw error;
      setRegisteredUsers((prev) => ({ ...prev, [eventId]: data }));
    } catch (error) {
      console.error("Error fetching registered users:", error.message);
    }
  }

  async function copyEvent(event) {
    try {
      const { name, location, time, date, seats, img, price, description } =
        event;
      const { data, error } = await supabase.from("events").insert([
        {
          name: `${name} (Copy)`,
          location,
          time,
          date,
          seats,
          img,
          price,
          description,
        },
      ]);
      if (error) throw error;
      alert("Event copied successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error copying event:", error.message);
    }
  }

 

  async function addEvent(event) {
    event.preventDefault();
    try {
      const { data, error } = await supabase.from("events").insert([
        {
          name,
          location,
          time,
          date,
          seats: seatsAvailable,
          img: imageUrl,
          price,
          description,
        },
      ]);
      if (error) throw error;
      alert("Event added successfully:", data);
      fetchEvents();
      setName("");
      setLocation("");
      setDate("");
      setTime("");
      setDate("");
      setPrice("");
      setSeatsAvailable("");
      setImageUrl("");
      setDescription("");
    } catch (error) {
      console.error("Error adding event:", error.message);
    }
  }

  async function fetchEvents() {
    try {
      const { data, error } = await supabase.from("events").select("*");
      if (error) throw error;
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error.message);
    }
  }

  async function updateEvent(eventId, updatedEvent) {
    try {
      const { data, error } = await supabase
        .from("events")
        .update(updatedEvent)
        .eq("id", eventId);
      if (error) throw error;
      alert("Event updated successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error.message);
    }
  }

  async function cancelEvent(eventId) {
    try {
      const { data, error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);
      if (error) throw error;
      alert("Event canceled successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error canceling event:", error.message);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

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
          .from("newusers")
          .select("username, name, admin")
          .eq("email", user.email)
          .single();
        if (error) {
          throw error;
        }
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error.message);
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
      <div className="wr2">
        <div className="flex">

<div className="content-x">
            <div className="padding"></div>
            <p>Update Your Events</p>
            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Seats</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Cancel Event</th>
                  <th>Save Changes</th>
                  <th>Copy Event</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <React.Fragment key={event.id}>
                    <tr>
                      <td>
                        <input
                          type="text"
                          value={event.name}
                          onChange={(e) =>
                            setEvents((prev) =>
                              prev.map((ev) =>
                                ev.id === event.id
                                  ? { ...ev, name: e.target.value }
                                  : ev
                              )
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={event.location}
                          onChange={(e) =>
                            setEvents((prev) =>
                              prev.map((ev) =>
                                ev.id === event.id
                                  ? { ...ev, location: e.target.value }
                                  : ev
                              )
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={event.date}
                          onChange={(e) =>
                            setEvents((prev) =>
                              prev.map((ev) =>
                                ev.id === event.id
                                  ? { ...ev, date: e.target.value }
                                  : ev
                              )
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          value={event.time}
                          onChange={(e) =>
                            setEvents((prev) =>
                              prev.map((ev) =>
                                ev.id === event.id
                                  ? { ...ev, time: e.target.value }
                                  : ev
                              )
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={event.seats}
                          onChange={(e) =>
                            setEvents((prev) =>
                              prev.map((ev) =>
                                ev.id === event.id
                                  ? { ...ev, seats: e.target.value }
                                  : ev
                              )
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={event.price}
                          onChange={(e) =>
                            setEvents((prev) =>
                              prev.map((ev) =>
                                ev.id === event.id
                                  ? { ...ev, price: e.target.value }
                                  : ev
                              )
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={event.img}
                          onChange={(e) =>
                            setEvents((prev) =>
                              prev.map((ev) =>
                                ev.id === event.id
                                  ? { ...ev, img: e.target.value }
                                  : ev
                              )
                            )
                          }
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => cancelEvent(event.id)}
                          className=" out"
                        >
                          Cancel
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => updateEvent(event.id, event)}
                          className="out"
                        >
                          Save
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => copyEvent(event)}
                          className="out"
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                    {openDropdown === event.id && (
                      <tr>
                        <td colSpan="10">
                          <div >
                            {registeredUsers[event.id] ? (
                              <ul>
                                {registeredUsers[event.id].map(
                                  (user, index) => (
                                    <li key={index}>{user.email}</li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <p>Loading...</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>


          <div className="form contentxl">
            <form onSubmit={addEvent} className="add-event-form">
              <p className="out">ADD EVENT</p>
              <label>
                Event Name:
                <br />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                Location:<br />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </label>
              <label>
                Time:<br />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </label>
              <label>
                Date<br />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label>
                Seats Available:<br />
                <input
                  type="number"
                  value={seatsAvailable}
                  onChange={(e) => setSeatsAvailable(e.target.value)}
                />
              </label>
              <label>
                Price:<br />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <label>
                Image URL:<br />
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </label>
              <label>
                Description:<br />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <button type="submit" className="out">Add Event</button>
            </form>
          </div>

          
        </div>

        <div className="dd">
          <button className="out" onClick={signOutUser}>
            SIGN OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
