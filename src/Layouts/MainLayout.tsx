import React from "react";
import Header from "../Components/Sidebar";
import Footer from "../Components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout d-flex flex-column">
      <div className="sidebar-div row m-0 p-4 ">
        <div className="col-2 me-3 border border-dark rounded-3">
          <Header />
        </div>
        <main className="col-9 ms-5 border border-dark rounded-3">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
