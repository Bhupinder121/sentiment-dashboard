import {string, z} from 'zod'
import libphonenumber from "google-libphonenumber";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
export type SessionPayload = {userId:string, expiresAt: Date};

export const SignupFormSchema = z.object({
    name: z.string().min(2, {message: "Name must be at least 2 characters long."}).trim(),
    email: z.string().email({message: "Please enter a valid email. "}).trim(),
  //   phone: z.string().refine(
  //   (number) => {
  //     try {
  //       const phoneNumber = phoneUtil.parse(number);
  //       return phoneUtil.isValidNumber(phoneNumber);
  //     } catch (error) {
  //       return false;
  //     }
  //   },
  //   { message: "Invalid mobile number" }
  // ),

    password: z.string().min(8, {message: "Be at least 8 characters long"})
    .regex(/[a-zA-Z]/, {message: 'Contains at least one letter.'})
    .regex(/[0-9]/, {message: "Contains at least one number."})
    .regex(/[^a-zA-Z0-9]/, {message: "Contain at least one special character."}).trim(), 
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',

});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
})

export type FormState = | {
    errors? : {
        name? : string[]
        email?: string[]
        phone?: string[]
        password?: string[]
        confirmPassword?: string[]
    }
    message? : string
}| undefined;