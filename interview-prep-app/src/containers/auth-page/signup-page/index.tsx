"use client";
import React, { useState } from "react";

export default function SignupPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

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

        <form>
          <p className='mb-4'>Please register an account</p>
          {/* Username input */}
          <div className='relative'>
            <input
              type='text'
              className=''
              id='exampleFormControlInput1'
              placeholder='Username'
            />
            <label htmlFor='exampleFormControlInput1' className='bg-slate-500'>
              Email address
            </label>
          </div>

          {/* Password input */}
          <div className='relative mb-4'>
            <input
              type='password'
              className=''
              id='exampleFormControlInput11'
              placeholder='Password'
            />
            <label htmlFor='exampleFormControlInput11' className=''>
              Password
            </label>
          </div>

          {/* Submit button */}
          <div className='mt-12  justify-center items-center'>
            <button
              className='mb-3 inline-block w-[60%]'
              type='button'
              style={{
                background:
                  "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
              }}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
