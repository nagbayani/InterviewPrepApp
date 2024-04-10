import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  //Authentication Login

  // Step 1: Learn Sign Ip/ Login
  //Step 2: Configure out mongodb to hanlde user login
  //Step 3: Bcrypt for the passwords
  //Figure out how to check authetnication

  const [userNameLogin, setUserNameLogin] = useState("");
  const [userPasswordLogin, setUserPasswordLogin] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
  console.log(failedLogin);

  const loginUser = async (ev) => {
    ev.preventDefault();
    console.log("ayeeee");
    if (userNameLogin === "testUser" && userPasswordLogin === "testPassword") {
      navigate("/home");
    } else {
      console.log("aye");
      setFailedLogin(true);
    }
    // const response = await fetch("http://localhost:3000/userAccess/login", {
    //   method: "POST",
    //   body: JSON.stringify({ userNameLogin, userPasswordLogin }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const responseData = await response.json();

    // if (response.status === 200) {
    //   console.log("responseData", responseData);
    //   navigate("/");
    // } else {
    //   alert("credentials failed");
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
        <form className='login-form' onSubmit={loginUser}>
          <h2 className='login-heading'> Login </h2>
          <div className='username-div-login'>
            <input
              className='login-inp'
              type='text'
              placeholder='Enter Username'
              value={userNameLogin}
              onChange={(ev) => setUserNameLogin(ev.target.value)}
            />
          </div>
          <div className='username-div-login'>
            <input
              className='pass-inp'
              type='password'
              placeholder='Enter Password'
              value={userPasswordLogin}
              onChange={(ev) => setUserPasswordLogin(ev.target.value)}
            />
          </div>
          <input className='login-submit-btn' type='submit' value='Submit' />
          <p style={{ color: "red" }}>
            {failedLogin && "Incorrect Username or Password. Please Try again."}
          </p>
          <div className='new-user-div'>
            <Link to='/signup' className='custom-link'>
              Dont have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
