import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { Input } from "@nextui-org/react";

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      if (user.avatar && user.avatar.url) {
        setAvatarPreview(user.avatar.url);
      } else {
        setAvatarPreview(
          "https://res.cloudinary.com/dfxyjskzh/image/upload/v1725499896/Blank-Profile-Picture_ebngxw.webp"
        );
      }
    }

    if (error) {
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch(loadUser());
      // navigate("/me", { replace: true });
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("email", email);
    formData.set("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <div className="bg-nbLightTheme py-4 font-roboto">
        <div className="max-w-[80%] mx-auto">
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
                  <p className="text-xl font-semibold">Edit Profile</p>
                </div>
                <div className="flex-shrink-0 w-[120px]"></div>
              </div>
              <hr className="border-gray-600 my-4" />
              <div className="flex items-center justify-between px-[20%]">
                <div className="flex items-center flex-grow">
                  <div className="flex-shrink-0">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-36 h-36 rounded-full object-cover shadow-md border border-gray-300"
                    />
                  </div>
                  <div className="flex flex-col ml-4">
                    <p className="font-semibold text-gray-700">
                      Upload a New Profile Photo
                    </p>
                    <p className="font-semibold text-sm italic text-gray-400 truncate max-w-[160px]">
                      {avatar ? avatar.name : "No file chosen"}
                    </p>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      className="hidden"
                      accept="image/*"
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    type="button"
                    className="py-2 w-36 bg-nbTheme hover:bg-nbDarkTheme text-white rounded-md shadow cursor-pointer"
                    onClick={() => document.getElementById("avatar").click()}
                  >
                    Choose Photo
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4 w-full">
              <p className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Personal Information
              </p>
              <div className="grid grid-cols-1 gap-2 px-[20%]">
                <div className="flex w-full justify-between mb-3">
                  <Input
                    labelPlacement="inside"
                    variant="bordered"
                    radius="sm"
                    type="text"
                    label="First Name"
                    name="firstName"
                    value={firstName}
                    size="md"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pr-1 font-bold"
                    required
                  />
                  <Input
                    labelPlacement="inside"
                    variant="bordered"
                    radius="sm"
                    type="text"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    size="md"
                    onChange={(e) => setLastName(e.target.value)}
                    className="pr-1 font-bold"
                    required
                  />
                </div>
                <Input
                  labelPlacement="inside"
                  variant="bordered"
                  radius="sm"
                  type="text"
                  label="Mobile Number"
                  name="mobileNumber"
                  value="9*** - *** - ****" //
                  size="md"
                  // onChange={(e) => setMobileNumber(e.target.value)}
                  className="font-bold mb-3"
                  required
                  // isDisabled //
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-600 text-small">(+63)</span>
                    </div>
                  }
                />

                <Input
                  labelPlacement="inside"
                  variant="bordered"
                  radius="sm"
                  type="email"
                  label="Email"
                  name="email"
                  value={email}
                  size="md"
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-bold mb-3"
                  required
                  isDisabled //
                />

                <Input
                  labelPlacement="inside"
                  variant="bordered"
                  radius="sm"
                  type="text"
                  label="Gender"
                  name="gender"
                  value=" " //
                  size="md"
                  // onChange={(e) => setGender(e.target.value)}
                  className="font-bold mb-3"
                  required
                  // isDisabled //
                />

                <Input
                  labelPlacement="inside"
                  variant="bordered"
                  radius="sm"
                  type="text"
                  label="Address"
                  name="address"
                  value="#1 Example St. Test City, Test State 12345, Philippines" //
                  size="md"
                  // onChange={(e) => setAddress(e.target.value)}
                  className="font-bold mb-3"
                  required
                  // isDisabled //
                />

                <button
                  type="submit"
                  className="w-full bg-nbTheme text-white py-2 flex justify-center items-center rounded-md hover:bg-[#3e326e] transition-all duration-300"
                  disabled={loading}
                >
                  Update Profile Information
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
