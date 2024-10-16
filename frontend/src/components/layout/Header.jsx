import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <nav
        className="navbar row align-items-center justify-content-between"
        style={{ backgroundColor: "#51438b", padding: "5px 50px" }}
      >
        <div className="col-2">
          <div className="navbar-brand">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dfxyjskzh/image/upload/v1725723067/national_diaries_logo_trim_avdp5r.png"
                alt="Logo"
                style={{
                  maxWidth: "150px",
                  height: "auto",
                }}
              />
            </Link>
          </div>
        </div>

        {user && (
          <div className="col-6 text-center">
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{ color: "#fff" }}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders/me" style={{ color: "#fff" }}>
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard" style={{ color: "#fff" }}>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="col-2 text-right">
          {user ? (
            <div className="dropdown d-flex align-items-center justify-content-end">
              <span style={{ color: "#fff", marginRight: "10px" }}>
                {user && user.name}
              </span>
              <Link
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              >
                <figure className="avatar avatar-nav" style={{ margin: 0 }}>
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "2px solid white",
                    }}
                  />
                </figure>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <hr
                  style={{
                    margin: "5px auto",
                    borderTop: "1px solid #ccc",
                    width: "80%",
                  }}
                />
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link
                to="/register"
                className="btn"
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "14px",
                  backgroundColor: "transparent",
                  border: "2px solid white",
                }}
              >
                Sign-up
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
