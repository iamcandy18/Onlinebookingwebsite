import React from 'react'
import { supabase } from '../client'
const Logout = () => {
    async function signOut() {
        const { error } = await supabase.auth.signOut()
      }
      
}

export default Logout