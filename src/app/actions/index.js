'use server';
import { signIn } from "@/auth";
export async function doSocialLogin(formData){
    const action = formData.get('action',{redirectTo:"/home"});
    await signIn(action)

}

export async function doLogout(){

}