import React from "react";
import Header from "../Components/Sidebar";
import Footer from "../Components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout d-flex flex-column">
      <div className="sidebar-div border border-dark rounded-3" style={{}}>
        <Header />
      </div>
      <main className="main border border-dark rounded-3">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
