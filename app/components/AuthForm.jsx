
"use client"
import React from 'react'
import {Auth} from "@supabase/auth-ui-react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import NormalLogin from './NormalLogin'
import { useState } from 'react'
function AuthForm() {
    const supabase= createClientComponentClient();
    const [selectLoginMethod,setSelectLoginMethod]=useState(false)

  return (
    <>
{
    selectLoginMethod ?  <
    Auth
    
    supabaseClient={supabase}
    view='magic_link'
    showLinks={false}
    providers={[]}
    redirectTo='https://company-list-blond.vercel.app/auth/callback'
    appearance={{
        theme:"dark",
        button:{
            className:"bg-white-400 text-gray-900 hover:bg-gray-600"
        },
        input:{
            className:"bg-gray-700 border-gray-600 text-white"
        }
    }}
/> : <NormalLogin/>
}
{
    selectLoginMethod ?  <p>
    
    <span onClick={()=>setSelectLoginMethod(!selectLoginMethod)} style={{
     color:"blue",
     cursor:"pointer"
    }}>
    Login
     </span>  using Email and Password 
 </p>  :  <p>
    
 <span onClick={()=>setSelectLoginMethod(!selectLoginMethod)} style={{
  color:"blue",
  cursor:"pointer"
 }}>
 Login
  </span>  using magic link
</p>
}  

    </>
 
  )
}

export default AuthForm