import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../api/client';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);  

  useEffect(() => {
    async function getUserData() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (data?.user) setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    setIsSubmitting(true);
    try {
      const { data: signInData, error } = await supabase.auth.signInWithPassword({ email, password });
      setIsSubmitting(false);
      if (error) throw error;

      alert('Login successful');
      if (data.mode === "yes") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setIsSubmitting(false);
      alert(`Login failed: ${error.message}`);
      console.log(error);
    }
  };

  return (
    <div className="loginbox wr1">
      <div className="loginbox2">
        <div>
      LOGIN
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="email"
              className="log"
              placeholder='Enter Your Email'
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className='err'>{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              className="log"
              placeholder='Enter Your Password'
              {...register('password', { 
                required: 'Password is required', 
                minLength: { value: 6, message: 'Password must be at least 6 characters long' } 
              })}
            />
            {errors.password && <p className='err'>{errors.password.message}</p>}
          </div>

          <button type="submit" className='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <h6>
          Not Registered Yet?
          <br />
          <Link to='/register' className='log1'>Create an Account</Link>
          </h6>
          </div>
      </div>
    </div>
  );
};

export default Login;
