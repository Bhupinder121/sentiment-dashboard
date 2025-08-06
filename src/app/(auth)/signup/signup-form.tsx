'use client'

import { signup } from '@/app/actions/auth'
import { LoginForm } from '@/components/login-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Fragment, useActionState, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormSchema } from '../../_lib/definitions';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import Link from 'next/link';
import 'react-phone-input-2/lib/style.css'
import { PhoneInput } from '@/components/ui/phone-input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from 'lucide-react';


export function SignUp() {
  const [state, staeaction, pending] = useActionState(signup, undefined);
  const [number, setnumber] = useState("");

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // console.log(form)


  const handleSubmit = (values: z.infer<typeof SignupFormSchema>)=>{
    console.log(values)
  }


  return (
    <div className="flex justify-center items-center h-screen fit-content bg-black ">
      <div className="flex min-h-[60vh] h-full w-full items-center justify-center px-4 ">
        <Card className="mx-auto max-w-sm w-100 test">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Create a new account by filling out the form below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form  action={staeaction} className="space-y-8">
                <div className="grid gap-4">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="name">Full Name</FormLabel>
                        <FormControl>
                          <Input required={true} id="name" placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        {state?.errors?.name && <FormMessage>{state?.errors.name}</FormMessage>}

                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input required={true}
                            id="email"
                            placeholder="johndoe@mail.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        {state?.errors?.email && <FormMessage>{state?.errors.email}</FormMessage>}

                      </FormItem>
                    )}
                  />

                  

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            placeholder="******"
                            autoComplete="new-password"
                            {...field}
                            type='password'
                          />
                        </FormControl>
                        <FormMessage />
                        {state?.errors?.password && <FormMessage>{state?.errors.password}</FormMessage>}

                      </FormItem>
                    )}
                  />

                  {/* Confirm Password Field */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="confirmPassword">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="confirmPassword"
                            placeholder="******"
                            autoComplete="new-password"
                            type='password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        {state?.errors?.confirmPassword && <FormMessage>{state?.errors.confirmPassword}</FormMessage>}
                        

                      </FormItem>
                    )}
                  />

                  {state?.DBerrors && 
                        <Alert variant="destructive">
                          <Terminal />
                          <AlertTitle>Heads up!</AlertTitle>
                          <AlertDescription>
                            Error, while creating account. Please try again
                          </AlertDescription>
                        </Alert>}
                  <Button  type="submit" className="w-full">
                    Register
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
