"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { signup } from "@/app/actions/auth";
import { SignupButton } from "@/components/signup-button/signup-button";

export default function SignupForm() {
  const [state, action] = useFormState(signup, undefined);

  return (
    <div className='flex h-[100vh] items-center justify-center justify-items-center bg-blue-900 '>
      <div className='signup bg-gray-900'>
        {/* Left column container */}
        {/* Logo */}
        <div className='text-center mb-[200px]'>
          <h4 className='text-center w-[50%] mt-1 pb-1 text-xl font-semibold'>
            Interview Preparation App{" "}
          </h4>
        </div>

        <form action={action}>
          <p className='mb-4'>Please register an account</p>
          {/* Email input */}
          <div className='relative'>
            <input
              type='text'
              className=''
              id='email'
              name='email'
              placeholder='Email'
            />
            <label htmlFor='email' className='bg-slate-500'>
              Email
            </label>
          </div>
          {state?.errors?.email && <p>{state.errors.email}</p>}

          {/* Username input */}
          <div className='relative'>
            <input
              type='text'
              className=''
              id='username'
              name='username'
              placeholder='User Name'
            />
            <label htmlFor='username' className='bg-slate-500'>
              Username
            </label>
          </div>
          {state?.errors?.username && <p>{state.errors.username}</p>}

          {/* Password input */}
          <div className='relative mb-4'>
            <input
              type='password'
              className=''
              id='password'
              placeholder='password'
            />
            <label htmlFor='password' className='bg-slate-500'>
              Password
            </label>
          </div>
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit button */}
          <div className='mt-12  justify-center items-center'>
            <SignupButton />
          </div>
        </form>
      </div>
    </div>
  );
}
