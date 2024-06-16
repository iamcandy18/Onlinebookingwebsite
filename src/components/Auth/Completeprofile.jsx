import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../api/client';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const CompleteProfile = () => {
  const [mode, setMode] = useState("no");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  const onSubmit = async (data) => {
    const { username, name } = data;
    setIsSubmitting(true);
    try {
      if (!user) throw new Error("No user logged in");

      await saveUserInfo({ email: user.email, username, name, mode });
      navigate("/dashboard");
    } catch (error) {
      setIsSubmitting(false);
      alert(`Saving profile failed: ${error.message}`);
    }
  };

  const saveUserInfo = async (user) => {
    const { email, username, name, mode } = user;
    const { data, error } = await supabase
      .from("newusers")
      .insert([{ username, email, name, Admin: mode }]);

    if (error) {
      console.error("Error saving user info:", error.message);
    } else {
      console.log("User info saved successfully:", data);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">Complete Your Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Username"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && <p className="error-message">{errors.username.message}</p>}
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>
          <div className="radio-group">
            <input
              type="radio"
              name="mode"
              id="User"
              checked={mode === "no"}
              onChange={() => setMode("no")}
              required
            />
            <label htmlFor="User">User</label>
            <input
              type="radio"
              name="mode"
              id="Admin"
              checked={mode === "yes"}
              onChange={() => setMode("yes")}
              required
            />
            <label htmlFor="Admin">Admin</label>
          </div>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
