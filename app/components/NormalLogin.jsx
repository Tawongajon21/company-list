"use client"
import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { ToastContainer,toast } from 'react-toast'
function NormalLogin() {
    const supabase=createClientComponentClient();
   
    const [user, setuser] = useState({
        email:"",
        password:""
    })
    async function signin(e) {
        e.preventDefault()
     const {error,data}=   await supabase.auth.signInWithPassword({
            email:user.email,
            password:user.password
        })
        
        if (!data.user===null&&!data.session===null) {
            alert("hello")
            //toast()
        }else{
            toast.error(error.message)
            console.log(error);
        }
     


    }
   

    const handleChange=(e)=>{
        const {name,value}=e.target;

setuser((prevstate)=>({
...prevstate,
[name]:value
}))
    }

  return (
    <>
    <ToastContainer />
    <form onSubmit={signin}>
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <label htmlFor="">Email</label>
<input value={user.email} className='bg-gray-700 border-gray-600 text-white' onChange={handleChange} name='email' type='email' />
</div>
     <div>
        <label htmlFor="">Passwowrd</label>
<input value={user.password} className='bg-gray-700 border-gray-600 text-white' onChange={handleChange} name='password' type='password' />
</div>
<button  className="bg-white-400 text-gray-900 hover:bg-gray-600">
    Login
</button>
    </form>

    </>
 
  )
}

export default NormalLogin