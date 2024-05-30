import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../api/client';
import { Link, useNavigate } from 'react-router-dom'; 
import { Auth } from '@supabase/auth-ui-react';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    const { email, password } = data;
    setIsSubmitting(true);
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({ email, password });
      console.log(signUpData, error);
      setIsSubmitting(false);
      if (error) throw error;
      alert('Signup successful, please check your email for verification link!');
      await supabase.from('users').insert([{ email, password }]);
      console.log('User signed up successfully:', signUpData);
      navigate("/dashboard"); 
    } catch (error) {
      setIsSubmitting(false);
      alert(`Signup failed: ${error.message}`); 
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

          Already have an account?
          <br />
          <Link to='/login' className='log1'>Login Here</Link>

          
            
              
           {/*
           <Auth
                supabaseClient={supabase}
                providers={["google,github"]}
              />*/}
           
          </div>
        </div>
      </div>
   
  );
}

export default Register;
