import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

const App = () => {
  return (
    <div>
      hey
      <div className='border-black flex'>
        <span>Why this no work?</span>
        <Home />
      </div>
      {/* <BrowserRouter>
        <Route path='/' element={<Home />} />
      </BrowserRouter> */}
    </div>
  );
};

export default App;

{
  /* <Route path='/login' element={<Login />} />
<Route path='/signup' element={<Signup />} /> */
}
