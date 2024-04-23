"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { authSignUp } from "@/app/api/auth";
import { SignupButton } from "@/components/signup-button/signup-button";

export default function SignupForm() {
  const [state, action] = useFormState(authSignUp, undefined);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });

  // const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    try {
      await authSignUp(state);
      // router.push("/dashboard"); // Redirect to dashboard after successful signup
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className='flex h-[100vh] items-center justify-center justify-items-center bg-blue-900 '>
      <div className='flex flex-col items-center bg-white'>
        {/* Left column container */}
        {/* Logo */}
        <div className='text-center'>
          <h4 className='mt-1 pb-1 text-xl font-semibold'>
            Interview Preparation App{" "}
          </h4>
        </div>

        <form action={action} onSubmit={handleSubmit}>
          <p className='mb-4'>Please register an account</p>
          {/* Email input */}
          <div className='relative flex flex-col mb-4'>
            <label htmlFor='email' className='bg-slate-500'>
              Email
            </label>
            <input
              type='text'
              className=''
              id='email'
              name='email'
              placeholder='Email'
              value={data.email}
              onChange={handleInput}
            />
          </div>
          {state?.errors?.email && <p>{state.errors.email}</p>}

          {/* Username input */}
          <div className='relative flex flex-col mb-4'>
            <label htmlFor='username' className='bg-slate-500'>
              Username
            </label>
            <input
              type='text'
              className=''
              id='username'
              name='username'
              placeholder='Username'
              value={data.username}
              onChange={handleInput}
            />
          </div>
          {state?.errors?.username && <p>{state.errors.username}</p>}

          {/* Password input */}
          <div className='flex flex-col relative mb-4'>
            <label htmlFor='password' className='bg-slate-500'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='password'
              value={data.password}
              onChange={handleInput}
            />
          </div>
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error: string) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit button */}
          <div className='mt-12  justify-center items-center'>
            <SignupButton pending={pending} />
          </div>
        </form>
      </div>
    </div>
  );
}
