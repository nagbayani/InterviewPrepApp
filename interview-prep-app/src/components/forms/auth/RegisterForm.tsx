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
import GoogleSignInButton from "@/components/GoogleSignInButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "../../ui/use-toast";
import { RegisterFormSchema } from "@/lib/validateSchema";
import { useTransition } from "react";
import { register } from "@/actions/register";

const RegisterForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
    try {
      startTransition(() => {
        register(values).then((data) => {
          console.log("data", data);
          if (data?.error) {
            toast({
              title: "Error",
              description: "Failed to register user.",
              variant: "destructive",
            });
            form.reset();
          }
          if (data?.success) {
            toast({
              title: "RegisterSuccess",
              description: "User created!",
            });
            form.reset();
            router.push("/login");
          }
        });
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Oops! Something went wrong with registering!",
        variant: "destructive",
      });
    }
    // const response = await fetch("/api/user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: values.username,
    //     email: values.email,
    //     password: values.password,
    //   }),
    // });
    // if (response.ok) {
    //   router.push("/login");
    // } else {
    //   toast({
    //     title: "Error",
    //     description: "Oops! Something went wrong!",
    //     variant: "destructive",
    //   });
    // }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='johndoe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Re-Enter your password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className='w-full mt-6 bg-black text-white'
          type='submit'
          disabled={isPending}
        >
          Sign up
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/login'>
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default RegisterForm;
