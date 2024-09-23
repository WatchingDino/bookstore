import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword, clearErrors } from "../../actions/userActions";

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
      <MetaData title={"Forgot Password"} />
      <div style={styles.container}>
        <div style={styles.leftPanel}>
          <h1 style={styles.heading}>Forgot Your Password? Let's Reset It!</h1>
          <p style={styles.paragraph}>
            It seems like you've forgotten your password. No worries! Just enter
            your email, and we'll send you a link to reset it and get you back
            on track.
          </p>
        </div>

        <div style={styles.rightPanel}>
          <h1 style={styles.heading}>Reset Your Password</h1>
          <form onSubmit={submitHandler} style={styles.form}>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <Link to="/login" style={styles.loginInstead}>
             Login Instead...
            </Link>
            <button
              type="submit"
              style={styles.submitButton}
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
    textAlign: "center",
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
  loginInstead: {
    alignSelf: "flex-end",
    marginBottom: "20px",
    textDecoration: "underline",
    color: "#51438b",
    cursor: "pointer",
  },
  submitButton: {
    width: "100%",
    padding: "10px 20px",
    backgroundColor: "#51438b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
  signInButton: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    border: "2px solid #fff",
    color: "#fff",
    borderRadius: "5px",
    textDecoration: "none",
    cursor: "pointer",
    marginTop: "20px",
    display: "inline-block",
  },
};

export default ForgotPassword;
