import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { getProductDetails } from "../../actions/productActions";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const location = useLocation();

  const { id } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  const [productName, setProductName] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setProductName(product.name);
    }
  }, [product]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <nav className="flex items-center justify-between px-5 py-2 bg-nbTheme">
        <div className="flex items-center w-1/6">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dfxyjskzh/image/upload/v1725723067/national_diaries_logo_trim_avdp5r.png"
              alt="Logo"
              className="max-w-[150px] h-auto"
            />
          </Link>
        </div>

        <div className="w-2/3 text-center">
          <ul className="flex justify-center space-x-4">
            <nav className="flex text-white rounded-lg" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a
                    href="/"
                    className="relative inline-flex items-center text-md font-medium text-white group"
                  >
                    Home
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
                <li className="">
                  <div className="flex items-center">
                    {location.pathname.startsWith("/product/") && (
                      <i className="pi pi-chevron-right text-white"></i>
                    )}

                    <a
                      href={location.pathname === "/" ? "/" : "/products"}
                      // href={"/products"}
                      className="relative inline-flex ms-1 items-center text-md font-medium text-white group"
                    >
                      Products
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  </div>
                </li>
                {location.pathname.startsWith("/product/") && (
                  <li className="" aria-current="page">
                    <div className="flex items-center">
                      <i className="pi pi-chevron-right text-nbLightTheme"></i>
                      <span className="ms-1 text-md font-medium text-nbLightTheme">
                        {productName}
                      </span>
                    </div>
                  </li>
                )}

                {/* <li>
                    <Link className="text-white hover:underline" to="/orders/me">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="text-white hover:underline" to="/dashboard">
                      Dashboard
                    </Link>
                  </li> */}
              </ol>
            </nav>
          </ul>
        </div>

        <div className="w-1/6 text-right">
          {user ? (
            <div className="relative inline-flex items-center justify-end">
              <span className="text-white mr-2">{user.name}</span>
              <Link
                type="button"
                id="dropDownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="cursor-pointer"
              >
                <figure className="avatar">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user.name}
                    className="rounded-full border-2 border-white w-10 h-10"
                  />
                </figure>
              </Link>
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
                aria-labelledby="dropDownMenuButton"
              >
                {user.role === "admin" && (
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  to="/orders/me"
                >
                  Orders
                </Link>
                <Link
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  to="/me"
                >
                  Profile
                </Link>
                <hr className="my-1 border-t border-gray-300" />
                <Link
                  className="block px-4 py-2 text-red-500 hover:bg-gray-100"
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
                className="text-white text-center text-sm font-bold rounded border-2 px-4 py-2 pointer hover:bg-nbDarkTheme transition-all duration-300"
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
