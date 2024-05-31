import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../api/client';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        if (data?.user) {
          setUser(data.user);
          console.log(data.user);
          if (data.user) {
            navigate("/dashboard");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }
    getUserData();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    const { email, password, username, name } = data;
    setIsSubmitting(true);
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({ email, password });
      console.log(signUpData, error);
      setIsSubmitting(false);
      if (error) throw error;
      alert('Signup successful, please check your email for verification link!');
      await saveUserInfo({ email, username, name });
      console.log('User signed up successfully:', signUpData);
      navigate("/dashboard");
    } catch (error) {
      setIsSubmitting(false);
      alert(`Signup failed: ${error.message}`);
    }
  };

  const saveUserInfo = async (user) => {
    const { email, username, name } = user;
    const { data, error } = await supabase
      .from('newusers')
      .insert([{ username: username, email: email, name: name }]);

    if (error) {
      console.error('Error saving user info:', error.message);
    } else {
      console.log('User info saved successfully:', data);
    }
  };

  return (
    <div>
      <div className="loginbox">
        <div className="loginbox2">
          SIGN UP NOW
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="text" className="log" placeholder='Enter Your Username'
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <p className='err'>{errors.username.message}</p>}
            </div>
            <div>
              <input
                type="text" className="log" placeholder='Enter Your Name'
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className='err'>{errors.name.message}</p>}
            </div>
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
            <button type="submit" className='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
          <h6>Already have an account?
            <br />
            <Link to='/login' className='log1'>Login Here</Link>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Register;
