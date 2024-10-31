import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { Input } from "@nextui-org/react";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.user);
  const success = (message = "") => toast.success(message);
  const notify = (error = "") => toast.error(error);
  useEffect(() => {
    if (error) {
      console.log(error);
      notify(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      success("Password updated successfully");
      navigate("/me");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);
    dispatch(updatePassword(formData));
  };
  return (
    <Fragment>
      <div className="bg-nbLightTheme py-4 font-roboto">
        <div className="max-w-[80%] mx-auto" >
          <form
            onSubmit={submitHandler}
            className="flex flex-col items-center space-y-6"
          >
            <div className="relative bg-white shadow-lg rounded-lg p-4 w-full">
              <div className="flex items-center justify-between mb-4">
                <Link
                  to="/me"
                  className="flex items-center justify-center w-[120px] py-2 bg-nbTheme hover:bg-nbDarkTheme text-white rounded-lg text-md text-center shadow cursor-pointer"
                >
                  <span className="pi pi-arrow-left mr-2"></span>
                  Go back
                </Link>
                <div className="flex-grow text-center">
                  <p className="text-xl font-semibold">Change Password</p>
                </div>
                <div className="flex-shrink-0 w-[120px]"></div>
              </div>
              <hr className="border-gray-600 my-4" />
              <div className="grid grid-cols-1 gap-2 px-[20%]">
                <Input
                  labelPlacement="inside"
                  variant="bordered"
                  radius="sm"
                  type="password"
                  label="Old Password"
                  value={oldPassword}
                  size="md"
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="mb-2"
                  required
                />
                <Input
                  labelPlacement="inside"
                  variant="bordered"
                  radius="sm"
                  type="password"
                  label="New Password"
                  value={password}
                  size="md"
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-2"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-nbTheme text-white py-2 flex justify-center items-center rounded-md hover:bg-[#3e326e] transition-all duration-300"
                  disabled={loading}
                >
                  Update Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
