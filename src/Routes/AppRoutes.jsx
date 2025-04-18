import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import Dashboard from "../Pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import NotDevpage from "../Components/NotDevPage";
import ErrorPage from "../Components/ErrorPage";

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/update" element={<NotDevpage />}></Route>
          <Route path="/manage" element={<NotDevpage />}></Route>
          <Route path="/view" element={<NotDevpage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
