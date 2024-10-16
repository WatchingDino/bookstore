import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";

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
      <MetaData title={"Register User"} />

      <div style={styles.container}>
        <div style={styles.leftPanel}>
          <h1 style={styles.heading}>Lorem Ipsum</h1>
          <p style={styles.paragraph}>
            Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </p>
          <Link to="/login" style={styles.signInButton}>
            Login
          </Link>
        </div>

        <div style={styles.rightPanel}>
          <h1 style={styles.heading}>Create Account</h1>
          <form onSubmit={submitHandler} style={styles.form}>
            <div style={styles.row}>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={onChange}
                style={styles.inputHalf}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={onChange}
                style={styles.inputHalf}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              style={styles.input}
            />
            <div style={styles.fileInputContainer}>
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                style={styles.avatarPreview}
              />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={onChange}
                style={styles.fileInput}
              />
            </div>
            <button
              type="submit"
              style={styles.signUpButton}
              disabled={loading}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const styles = {
  container: {
    display: "flex",
    width: "70%",
    height: "500px",
    margin: "100px auto",
    boxShadow: "0 4px 18px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  leftPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #6e629e, #51438b)",
    color: "#fff",
    padding: "20px",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "20px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "1rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  inputHalf: {
    width: "48%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  fileInputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  fileInput: {
    width: "70%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  avatarPreview: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid #ccc",
    marginLeft: "20px",
  },
  signInButton: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    border: "2px solid #fff",
    color: "#fff",
    borderRadius: "5px",
    textDecoration: "none",
    cursor: "pointer",
  },
  signUpButton: {
    width: "100%",
    padding: "10px 20px",
    backgroundColor: "#51438b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Register;
