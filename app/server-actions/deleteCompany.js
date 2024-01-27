"use server"
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache"
export async function deleteCompany(formData) {
    const companyId= formData.get("id");
    const cookieStore= cookies()
    const supabase=createServerComponentClient({cookies:()=>cookieStore})
    const {data:{session}}= await supabase.auth.getSession();
    const user= session?.user;
    if (!user) {
        console.log("user not authenticated");
        return 
    }
    const {error}= await supabase.from("companies").delete().match({id:companyId,user_id:user.id});
 
    if (error) {
        console.log("error",error);
        return 
    }
    revalidatePath("/companies")
    return {message:"success"}
}