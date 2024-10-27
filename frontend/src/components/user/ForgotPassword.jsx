import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword, clearErrors } from "../../actions/userActions";
import { Input } from "@nextui-org/react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  const success = (message = "") => toast.success(message);
  const notify = (error = "") => toast.error(error);

  useEffect(() => {
    if (error) {
      notify(error);
      dispatch(clearErrors());
    }
    if (message) {
      success(message);
    }
  }, [dispatch, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(forgotPassword(formData));
  };

  return (
    <Fragment>
      <div className="flex w-[70%] h-[500px] my-[50px] mx-auto shadow-lg rounded-lg overflow-hidden font-bold font-roboto">
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-[#6e629e] to-nbDarkTheme text-white p-5">
          <p className="text-2xl text-center mb-4">Forgot Your Password?</p>
          <p className="text-center mb-4 font-normal">
            It seems like you've forgotten your Password. No worries! Just enter
            your Email, and we'll send you a link to reset it and get you back
            on track.
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-white p-5">
          <h1 className="text-2xl mb-4">Reset Your Password</h1>
          <form
            onSubmit={submitHandler}
            className="w-4/5 flex flex-col items-center"
          >
            <Input
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              size="md"
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3"
              required
            />
            <Link
              to="/login"
              className="self-end mb-4 hover:underline text-nbTheme text-sm"
            >
              Login Instead
            </Link>
            <button
              type="submit"
              className="w-full py-2 bg-nbTheme hover:bg-nbDarkTheme text-white rounded text-lg cursor-pointer"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
