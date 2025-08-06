'use server'


import { AddUser } from "../_lib/common";
import { SignupFormSchema, FormState } from "../_lib/definitions";
import bcrypt from "bcrypt";
import { ulid } from "ulid";
import { createSession, deleteSession } from "../_lib/session";
import { redirect } from "next/navigation";
import { sendMail } from "../helpers/sendMail";


export async function signup(state: FormState, formData: FormData) {

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Do not need it i guess at the moment??
    const validatedFields = SignupFormSchema.safeParse({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    });

    if (!validatedFields.success) {
        console.log(validatedFields.error);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }



    const hashedPassword = await bcrypt.hash(password, 10)

    // console.log(hashedPassword)
    let userId = ulid();
    // sendMail()

    const user = await AddUser(userId, name, email, hashedPassword)
    
    if(!user){
        return {DBerrors: "Error, while creating account. Please try again"}
    }
    console.log(user);
    await createSession(userId);

    setTimeout(()=>{
        fetch("http://192.168.0.118:3000/api/sendOTP",  {
                method: 'GET'})
    }, 100)

    redirect("/verify-otp")
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}