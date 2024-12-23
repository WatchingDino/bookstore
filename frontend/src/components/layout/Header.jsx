import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { getProductDetails } from "../../actions/productActions";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Badge,
} from "@nextui-org/react";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

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
      <nav className="flex items-center justify-between px-5 py-2 bg-nbTheme font-roboto">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dfxyjskzh/image/upload/v1725723067/national_diaries_logo_trim_avdp5r.png"
              alt="Logo"
              className="max-w-[150px] h-auto"
            />
          </Link>
        </div>

        <div className="text-center">
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
                <li className="flex items-center">
                  {location.pathname.startsWith("/product/") && (
                    <i className="pi pi-chevron-right text-white"></i>
                  )}

                  <a
                    // href={location.pathname === "/" ? "/" : "/products"}
                    href={"/products"}
                    className="relative inline-flex ms-1 items-center text-md font-medium text-white group"
                  >
                    Products
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
                {location.pathname.startsWith("/product/") && (
                  <li className="flex items-center pr-4" aria-current="page">
                    <i className="pi pi-chevron-right text-nbLightTheme"></i>
                    <span className="ms-1 text-md font-medium text-nbLightTheme">
                      {productName}
                    </span>
                  </li>
                )}
                <li className="flex items-center">
                  <a
                    href="/#aboutUs"
                    className="relative inline-flex ms-1 items-center text-md font-medium text-white group"
                  >
                    About Us
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    href="/#contactInfo"
                    className="relative inline-flex ms-1 items-center text-md font-medium text-white group"
                  >
                    Contact Info
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
                {/* 
                  <li>
                    <Link className="text-white hover:underline" to="/dashboard">
                      Dashboard
                    </Link>
                  </li> */}
              </ol>
            </nav>
          </ul>
        </div>

        <div className="">
          {user ? (
            <div className="flex items-center gap-3">
              <a
                href="/cart"
                className="hover:bg-gray-200/80 w-12 h-10 rounded flex items-center justify-center relative"
              >              
                {cartItems.length > 0 && (
                  <Badge
                    color="danger"
                    content={cartItems.length}
                    shape="circle"
                    className="absolute -top-2 -right-7 border-none text-xs text-white font-bold h-5 w-5 flex items-center justify-center"
                  />
                )}
                <i className="pi pi-shopping-cart text-2xl text-white" />
              </a>

              <Dropdown
                placement="bottom-end"
                showArrow
                radius="sm"
                classNames={{
                  base: "before:bg-white",
                  content: "p-0 border-small border-divider bg-white",
                }}
              >
                <DropdownTrigger>
                  <Button
                    className="text-white font-bold text-sm rounded"
                    variant="ghost"
                    disableRipple
                  >
                    Profile
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="User Actions"
                  variant="flat"
                  disabledKeys={["profile"]}
                  className="p-2"
                  itemClasses={{
                    base: [
                      "rounded-md",
                      "text-default-500",
                      "transition-opacity",
                      "data-[hover=true]:text-foreground",
                      "data-[hover=true]:bg-default-100",
                      "dark:data-[hover=true]:bg-default-50",
                      "data-[selectable=true]:focus:bg-default-50",
                      "data-[pressed=true]:opacity-70",
                      "data-[focus-visible=true]:ring-default-500",
                    ],
                  }}
                >
                  <DropdownSection aria-label="My Profile" showDivider>
                    <DropdownItem
                      isReadOnly
                      key="profile"
                      className="h-14 gap-2 opacity-100"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-10 h-10">
                          <img
                            src={
                              user.avatar
                                ? user.avatar.url
                                : "https://res.cloudinary.com/dfxyjskzh/image/upload/v1725499896/Blank-Profile-Picture_ebngxw.webp"
                            }
                            alt={`${user.firstName} ${
                              user.lastName ? user.lastName.charAt(0) : ""
                            } Profile`}
                            className="w-full h-full rounded-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-2 flex flex-col justify-start font-roboto">
                          <div className="font-bold text-black text-md">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-xs text-gray-600 font-semibold">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection
                    aria-label="Manage Account & View Orders"
                    showDivider
                  >
                    <DropdownItem
                      key="personalInformation"
                      href="/me"
                      description="Edit Personal Information"
                      startContent={<i className="pi pi-user-edit text-xl" />}
                      classNames={{
                        title: "pl-1 font-bold font-roboto",
                        description: "pl-1 font-bold font-roboto text-gray-600",
                      }}
                    >
                      Customize Profile
                    </DropdownItem>
                    <DropdownItem
                      key="orders"
                      href="/orders/me"
                      description="View my Orders"
                      startContent={<i className="pi pi-box text-xl" />}
                      classNames={{
                        title: "pl-1 font-bold font-roboto",
                        description: "pl-1 font-bold font-roboto text-gray-600",
                      }}
                    >
                      Orders
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection aria-label="Logout Account">
                    <DropdownItem
                      onClick={logoutHandler}
                      color="danger"
                      className="text-danger"
                      startContent={<i className="pi pi-sign-out text-xl" />}
                      classNames={{
                        title: "pl-1 font-bold font-roboto",
                      }}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            !loading && (
              <Link to="/login">
                <Button
                  className="text-white font-bold text-sm rounded"
                  variant="ghost"
                  disableRipple
                >
                  Login
                </Button>
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
