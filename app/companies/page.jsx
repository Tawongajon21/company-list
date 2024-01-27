import React from 'react'
import CompanyForm from '../components/CompanyForm'
import EditCompany from '../components/EditCompany'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { deleteCompany } from '../server-actions/deleteCompany'
async function Page() {
    const cookieStore= cookies();
    const supabase= createServerComponentClient({cookies:()=>cookieStore})
  const {data:{session}}=await supabase.auth.getSession();
  console.log(session);
 const user=session?.user;
 const {data:companies,error}=await supabase.
 from("companies").
 select("*").
 eq("user_id",user.id)
 .order("name",{ascending:true})
if (error) {
    console.error("error fetching");
}
console.log(companies);
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
    <div className="container mx-auto p-6 sm:p-12">
        <div className="flex justify-between items-start">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">My Company List</h1>
            <form action="/auth/signout" method="post">
                <button 
                    type="submit" 
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign out
                </button>
            </form>
        </div>
        <CompanyForm />
        <div className="mt-6">
            {companies.map((item) => (
                <div key={item.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl text-white mb-2">{item.name} - {item.industry}</h2>
                <div className="flex space-x-2">
                    <form action={deleteCompany}>
                    <input type="hidden" name="id" value={item.id} />
                    <button 
                        type="submit"

                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                    </form>
                    <EditCompany item={item} />
                </div>
                </div>
            ))}
        </div>
    </div>
</div>
  )
}

export default Page