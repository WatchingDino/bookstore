import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { Input } from "@nextui-org/react";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "https://res.cloudinary.com/dfxyjskzh/image/upload/v1725499896/Blank-Profile-Picture_ebngxw.webp"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <div className="flex w-[70%] h-[500px] my-[50px] mx-auto shadow-lg rounded-lg overflow-hidden font-bold font-roboto">
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-[#6e629e] to-nbDarkTheme text-white p-5">
          <p className="text-2xl mb-4">Welcome Back!</p>
          <p className="text-center mb-4 font-normal">
            Log in to pick up right where you left off and enjoy easy access to
            your account and current offers.
          </p>
          <Link
            to="/login"
            className="py-2 px-4 border-2 border-white bg-inherit text-lg text-white rounded cursor-pointer"
          >
            Login
          </Link>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-white p-5">
          <p className="text-2xl mb-4">Create an Account</p>
          <form
            onSubmit={submitHandler}
            className="w-4/5 flex flex-col items-center"
          >
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
                onChange={onChange}
                className="pr-1"
                isRequired
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
                onChange={onChange}
                className="pl-1"
                isRequired
                required
              />
            </div>
            <Input
              labelPlacement="inside"
              variant="bordered"
              radius="sm"
              type="text"
              label="Email"
              name="email"
              value={email}
              size="md"
              onChange={onChange}
              className="mb-3"
              isRequired
              required
            />
            <Input
              labelPlacement="inside"
              variant="bordered"
              radius="sm"
              type="text"
              label="Password"
              name="password"
              value={password}
              size="md"
              onChange={onChange}
              className="mb-3"
              isRequired
              required
            />
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex justify-center items-center w-1/4">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-[50px] h-[50px] rounded-full object-cover object-center border border-gray-400"
                />
              </div>
              <Input
                variant="bordered"
                radius="sm"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={onChange}
                className="w-3/4 p-0"
                required
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <AttachFileIcon />
                  </div>
                }
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-nbTheme hover:bg-nbDarkTheme text-white rounded text-lg cursor-pointer"
              disabled={loading}
            >
              {loading ? "Creating an Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
