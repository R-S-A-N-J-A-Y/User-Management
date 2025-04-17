import LoginForm from "../Components/LoginForm";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="p-3 d-flex flex-column gap-4">
      <div className="top text-center px-5 py-3 ">
        <h1>Welcome Back !!</h1>
        <h3>
          Your dashboard awaits. Dive into seamless user management with
          AccessHub — log in to get started.
        </h3>
      </div>
      <div className="middle ">
        <LoginForm />
      </div>
      <div className="bottom ">
        <p className="fs-5 text-center">
          Don't have an Account ? Try{" "}
          <NavLink to="/register"> Registering </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
