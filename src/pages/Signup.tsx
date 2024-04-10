import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [usernameTaken, setUsernameTaken] = useState(false);

  const register = async (ev) => {
    ev.preventDefault(); //This will not let the user go to the next page yet:

    setUsernameTaken(true);
    // const response = await fetch("http://localhost:3000/access/signup", {
    //   method: "POST",
    //   body: JSON.stringify({ userName, userPassword }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const responseData = await response.json();
    // console.log("response Data from signup", responseData);

    // if (response.status === 200) {
    //   alert("Registration Successful");

    //   navigate("/");
    // } else {
    //   alert("Registration failed");
    // }
  };

  return (
    <div className='login-page'>
      <nav className='navBar'>
        <div className='logoTitle'>
          <h1>
            <Link className='linkItem' to='/'>
              Pepper Deck
            </Link>
          </h1>
        </div>
        <div className='rightNav'>
          <Link className='linkItem' to='/login'>
            Login
          </Link>
          <Link className='linkItem' to='/signup'>
            Sign Up
          </Link>
        </div>
      </nav>
      <div className='login-div'>
        <div className='login-heading-banner'></div>
        <form className='login-form' onSubmit={register}>
          <h2 className='login-heading'> Sign Up </h2>
          <div className='username-div-login'>
            <input
              className='login-inp'
              type='text'
              placeholder='Enter Username'
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
          </div>
          <div className='username-div-login'>
            <input
              className='pass-inp'
              type='password'
              placeholder='Enter Password'
              value={userPassword}
              onChange={(ev) => setUserPassword(ev.target.value)}
            />
          </div>
          <input className='login-submit-btn' type='submit' value='Sign Up' />
          <p style={{ color: "red" }}>
            {usernameTaken && "Username Taken. Please Try again."}
          </p>
          <div className='new-user-div'>
            <Link to='/login' className='custom-link'>
              Existing User?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
