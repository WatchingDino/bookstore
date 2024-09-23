import React, { Fragment } from "react";
import Search from "./Search";
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
        className="navbar row align-items-center"
        style={{ backgroundColor: "#51438b" }}
      >
        <div className="col-3 text-center">
          <div className="navbar-brand">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dfxyjskzh/image/upload/v1725723067/national_diaries_logo_trim_avdp5r.png"
                alt="Logo"
                style={{ maxWidth: "100px", height: "auto" }}
              />
            </Link>
          </div>
        </div>

        {/* <div className="col-6">
          <Search />
        </div> */}

        <div className="col-3 text-center">
          {user ? (
            <div className="dropdown">
              <Link
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
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
                to="/login"
                className="btn"
                id="login_btn"
                style={{
                  color: "#fff",
                  backgroundColor: "transparent",
                  border: "2px solid white",
                }}
              >
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
