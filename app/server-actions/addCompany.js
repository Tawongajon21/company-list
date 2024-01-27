"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function addCompany(formData) {
    const name= formData.get("name")
    const industry= formData.get("industry")
    const referenceNumber= formData.get("referenceNumber")
    const cookieStore= cookies();
    const supabase= createServerComponentClient({cookies:()=>cookieStore})
const {data:{session}}= await supabase.auth.getSession();
const user= session?.user
if (!user) {
    console.error("user is not authenticated ")
    return
}
const existingCompany= await supabase.from("companies").select("reference_number").eq("reference_number","30909110");
console.log(existingCompany);
const {data,error}= await supabase
.from("companies").insert([
    {
        name,industry,reference_number:referenceNumber,user_id:user.id
    }
])
if (error) {
    console.error("Error inserting data",error)
    return
}
revalidatePath("/companies")
return {message:"Success"}
}