import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '../api/client';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mode, setMode] = useState("no");

  const onSubmit = async (data) => {
    const { email, password } = data
    setIsSubmitting(true)
    try {
      const { data: signInData, error } = await supabase.auth.signInWithPassword({ email, password })
      console.log(signInData, error)
      setIsSubmitting(false)
      if (error) throw error
      alert('Login successful');
      await saveUserInfo({ mode });

      if (mode === "yes") navigate("/admin");
      else navigate("/dashboard");
    } catch (error) {
      setIsSubmitting(false)
      alert(`Login failed: ${error.message}`)
      console.log(error)
    }
  }
  
  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      console.error("Error during OAuth login:", error.message);
    }
  };

  const saveUserInfo = async (user) => {
    const { mode } = user;
    const { data, error } = await supabase
      .from('newusers')
      .insert([{ admin: mode }]);

    if (error) {
      console.error('Error saving user info:', error.message);
    } else {
      console.log('User info saved successfully:', data);
    }
  };

  return (
    <div>
      <div className="loginbox"> 
        <div className="wr">
          <div className="loginbox2">
            <div className="dash1"></div>
            LOGIN
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="email" className="log" placeholder='Enter Your Email'
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className='err'>{errors.email.message}</p>}
              </div>

              <div>
                <input
                  type="password" className="log" placeholder='Enter Your Password'
                  {...register('password', { 
                    required: 'Password is required', 
                    minLength: { value: 6, message: 'Password must be at least 6 characters long' } 
                  })}
                />
                {errors.password && <p className='err'>{errors.password.message}</p>}
              </div>

              <div className='label'>
                <input
                  type="radio"
                  name="mode"
                  id="User"
                  onChange={() => setMode("no")}
                  required
                  checked={mode === "no"}
                />
                <label htmlFor="User">User</label>
                <input
                  type="radio"
                  name="mode"
                  id="Admin"
                  onChange={() => setMode("yes")}
                  required
                  checked={mode === "yes"}
                />
                <label htmlFor="Admin">Admin</label>
              </div>

              <button type="submit" className='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <h6>
              Not Registered Yet?
              <br />
              <Link to='/register' className='log1'>
                Create an Account
              </Link>
            </h6>

            <div className="loginother">
              <button className='cont1' onClick={() => handleOAuthLogin('google')} >
                <i className="fa fa-google" aria-hidden="true"></i>
              </button>
              <button className='cont1' onClick={() => handleOAuthLogin('github')} >
                <i className="fa fa-github" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
