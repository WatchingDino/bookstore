import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@nextui-org/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = new URLSearchParams(location.search).get("redirect");
  const notify = (error = "") => toast.error(error);
  useEffect(() => {
    if (isAuthenticated && redirect === "shipping") {
      navigate(`/${redirect}`, { replace: true });
    } else if (isAuthenticated) navigate("/");
    if (error) {
      console.log(error);
      notify(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      <div className="flex w-[70%] h-[500px] my-4 mx-auto shadow-lg rounded-lg overflow-hidden font-bold font-roboto">
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-5">
          <p className="text-2xl mb-4">Login Account</p>
          <form
            onSubmit={submitHandler}
            className="w-4/5 flex flex-col items-center"
          >   
            <Input
              labelPlacement="inside"
              variant="bordered"
              radius="sm"
              type="email"
              label="Email"
              value={email}
              size="md"
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3"
              required
            />
            <Input
              labelPlacement="inside"
              variant="bordered"
              radius="sm"
              type="password"
              label="Password"
              value={password}
              size="md"
              onChange={(e) => setPassword(e.target.value)}
              className="mb-2"
              required
            />
            <Link
              to="/password/forgot"
              className="self-end mb-4 hover:underline text-nbTheme text-sm"
            >
              Forgot your password?
            </Link>
            <button
              type="submit"
              className="w-full py-2 bg-nbTheme hover:bg-nbDarkTheme text-white rounded text-lg cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button> 
          </form>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-5 bg-gradient-to-r from-nbTheme to-[#6e629e] text-white">
          <p className="text-2xl text-center mb-4">Don't have an accountt?</p>
          <p className="text-center mb-4 font-normal">
            Create an account to gain access to exclusive offers and explore our
            amazing collection.
          </p>
          <Link
            to="/register"
            className="py-2 px-4 border-2 border-white bg-inherit text-lg text-white rounded cursor-pointer"
          >
            Sign-up
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
