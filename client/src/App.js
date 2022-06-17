import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import myContext from "./Context/useContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import PageNotFound from "./Pages/PageNotFound";
import Profile from "./Pages/Profile";


function App() {
  const context = useContext(myContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {
          Object.keys(context).length !== 0 ? null : <Route path="login" element={<Login />} />
        }

        {
          Object.keys(context).length !== 0 ? <Route path="profile" element={<Profile />} /> : null
        }

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
