import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <h1 style={styles.heading}>Login Account</h1>
        <form onSubmit={submitHandler} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <Link to="/password/forgot" style={styles.forgotLink}>
            Forgot your password?
          </Link>
          <button type="submit" style={styles.signInButton}>
            Login
          </button>
        </form>
      </div>

      <div style={styles.rightPanel}>
        <h1 style={styles.heading}>Hello, Friend!</h1>
        <p style={styles.paragraph}>
          Enter your personal details and start your journey with us
        </p>
        <Link to="/register" style={styles.signUpButton}>
          Register
        </Link>
      </div>
    </div>
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
    backgroundColor: "#fff",
    padding: "20px",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #51438b, #6e629e)",
    color: "#fff",
    padding: "20px",
    backgroundColor: "#4195d3",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  form: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  forgotLink: {
    alignSelf: "flex-end",
    marginBottom: "20px",
    textDecoration: "underline",
    color: "#51438b",
  },
  signInButton: {
    width: "100%", 
    padding: "10px 20px",
    backgroundColor: "#51438b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  paragraph: {
    fontSize: "1rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  signUpButton: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    border: "2px solid #fff",
    color: "#fff",
    borderRadius: "5px",
    textDecoration: "none",
    cursor: "pointer",
  },
};

export default Login;
