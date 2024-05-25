import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '../client'
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data) => {
    const { email, password } = data
    setIsSubmitting(true)
    try {
      const { data: signInData, error } = await supabase.auth.signInWithPassword({ email, password })
      console.log(signInData, error)
      setIsSubmitting(false)
      if (error) throw error
      alert('Login successful')
    } catch (error) {
      setIsSubmitting(false)
      alert('Login failed: ${error.message}')
      console.log(error)
    }
  }

  return (
 <div>
      <div className="loginbox">
      <div className="loginbox2">
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

      <button type="submit" className='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
    
    
    Not Registered Yet?
        <br />

        <Link to={'/Register'} className='log1'>
        Create an Account
</Link>

    </div>
      </div>
    </div>
  )
}

export default Login