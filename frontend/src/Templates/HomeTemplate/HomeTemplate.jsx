import React from "react";
import { Navbar } from "../../component/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../../component/Footer/index.jsx";

const HomeTemplate = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeTemplate;
