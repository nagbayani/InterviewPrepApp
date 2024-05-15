"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Link from "next/link";
import GoogleSignInButton from "@/components/GoogleSignInButton";

import { AuthError } from "next-auth";
// import { signIn } from "next-auth/react";

import { signIn } from "../../../../auth";
import { useRouter } from "next/navigation";
import { useToast } from "../../ui/use-toast";
import { DEFAULT_LOGIN_REDIRECT } from "../../../../routes";
import { useSearchParams } from "next/navigation";

import { useTransition } from "react";
import { LoginFormSchema } from "@/lib/validateSchema";
import { login } from "@/actions/login";

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    try {
      startTransition(() => {
        login(values, callbackUrl).then((data) => {
          if (data?.error) {
            toast({
              title: "Error",
              description: "Login Failed. Invalid credentials",
              variant: "destructive",
            });
            form.reset();
          }

          // if (data?.success) {
          //   console.log("LOGIN SUCCESS", data.success);
          //   form.reset();
          //   router.push("/home");
          //   router.refresh();
          // }
        });
      });
    } catch (error) {
      console.log(error, "LOGIN ERROR");
    }
  };
  // if (signInData?.error) {

  // } else if (signInData?.ok) {
  //   console.log("LOGIN SUCCESS");
  //   router.push("/home");
  //   router.refresh();
  // }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          Sign in
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/register'>
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;

// try {
//   await signIn("credentials", {
//     email: values.email,
//     password: values.password,
//     redirectTo: DEFAULT_LOGIN_REDIRECT,
//   });
// } catch (error) {
//   if (error instanceof AuthError) {
//     switch (error.type) {
//       case "CredentialsSignin":
//         toast({
//           title: "Error",
//           description: "Invalid credentials",
//           variant: "destructive",
//         });
//         return { error: "Invalid credentials" };
//       default:
//         toast({
//           title: "Error",
//           description: "Something went wrong",
//           variant: "destructive",
//         });
//         return { error: "Something went wrong!" };
//     }
//   }
//   throw error;
