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
      <nav className="flex items-center justify-between px-5 py-2 bg-[#51438b]">
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
            {/* <li>
              <Link className="text-white hover:underline" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-white hover:underline" to="/products">
                Products
              </Link>
            </li> */}
            {/* 
            <li>
              <Link className="text-white hover:underline" to="/orders/me">
                Orders
              </Link>
            </li>
            <li>
              <Link className="text-white hover:underline" to="/dashboard">
                Dashboard
              </Link>
            </li>
            */}

            <nav className="flex text-white rounded-lg" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a
                    href="/"
                    className="inline-flex items-center text-md font-medium text-white hover:underline group"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    {location.pathname !== "/" && (
                      <i className="pi pi-chevron-right text-white"></i>
                    )}

                    <a
                      href={location.pathname === "/" ? "/" : "/products"}
                      className="inline-flex ms-1 items-center text-md font-medium text-white hover:underline group"
                    >
                      Products
                    </a>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    {location.pathname !== "/" && (
                      <i className="pi pi-chevron-right text-[#A8A1C5]"></i>
                    )}
                    <span className="ms-1 text-md font-medium text-[#A8A1C5]">
                      {productName}
                    </span>
                  </div>
                </li>
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
                data-bs-toggle="dropdown" // Keep this if using Bootstrap JS for dropdown
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
                className="btn text-white font-bold text-sm border-2 border-white px-4 py-2 hover:bg-white hover:text-[#51438b] hover:border-[#51438b] "
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
