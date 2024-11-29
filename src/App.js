import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home"; 

import SignIn from "./SignIn";
import Register from "./Register";
import Next from "./First";
import Footer from "./Footer";

function App() {
  return (
    <>
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="SignIn" element={<SignIn/>}></Route>
        <Route path="Register" element={<Register/>}></Route>
     <Route path="details" element={<Next/>}></Route>
     
      </Routes>
      
    </Router>
    <Footer/>
    </>
  );
}

export default App;
