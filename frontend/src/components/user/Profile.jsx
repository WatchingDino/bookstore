import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-nbLightTheme py-4 font-roboto">
          <div className="max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Profile Section */}
            <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg py-4">
              <p className="text-2xl font-semibold mb-3">My Profile</p>
              <div className="px-4 w-full flex justify-center items-center mb-3">
                <img
                  className="w-72 h-72 rounded-full object-cover shadow-md border border-gray-300"
                  src={user.avatar.url}
                  alt={`${user.firstName} ${user.lastName} Profile`}
                />
              </div>

              <div>
                <p className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-md text-muted mb-4">{user.email}</p>
              </div>

              <div className="flex flex-col w-full space-y-2 px-8">
                <Link
                  to="/me/update"
                  className="w-full py-2 bg-nbTheme hover:bg-nbDarkTheme text-white rounded-lg text-lg text-center shadow cursor-pointer"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/password/update"
                  className="w-full py-2 bg-nbTheme hover:bg-nbDarkTheme text-white rounded-lg text-lg text-center shadow cursor-pointer"
                >
                  Change Password
                </Link>
              </div>
            </div>

            {/* Account Status Section */}
            <div className="flex flex-col gap-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-lg">
                <h3 className="text-md font-semibold mb-3">Account Status</h3>
                <div className="flex items-center justify-between mb-1">
                  <span>{user.email}</span>
                  <span className="text-green-500 font-bold">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>(+63) 9*** - *** - ****</span>
                  <span className="text-red-500 font-bold">Not Verified</span>
                </div>
              </div>

              {/* Orders Section */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-lg">
                <h3 className="text-md font-semibold mb-3">My Orders</h3>
                <ul className="space-y-1">
                  <li className="flex justify-between">
                    <span>Order #*****</span>
                    <span className="text-green-500 font-bold">Completed</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Order #*****</span>
                    <span className="text-orange-500 font-bold">Pending</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Order #*****</span>
                    <span className="text-red-500 font-bold">Cancelled</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
