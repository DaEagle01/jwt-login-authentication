import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import useAuth from "../hook/useAuth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  // console.log(user);
  const auth = getAuth();
  const handleLogOut = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      signOut(auth)
        .then("sign out successfully!", console.log("loggedout successfully"))
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div>
      <nav style={{}} className="bg-gray-800 text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/">
                {" "}
                <img
                  src="https://nemesisconsultants.com/images/logo.png"
                  alt=""
                  className="h-12 w-"
                />
              </Link>
            </div>{" "}
            <div className="flex items-end justify-end">
              <div className="hidden md:block">
                <div className="ml-10 flex items-center justify-center space-x-4">
                  <div></div>
                  <div>
                    <Link
                      to="/userinfo"
                      className="text-gray-300 hover:bg-gray-500 hover: text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      User Info
                    </Link>

                    <Link
                      to="/userinfoform"
                      className="text-gray-300 hover:bg-gray-500 hover: text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      UserInfo Form
                    </Link>

                    {user?.email || user?.name ? (
                      <Link
                        to="/"
                        onClick={handleLogOut}
                        className="text-gray-300 hover:bg-gray-500 hover: text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Logout
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        className="text-gray-300 hover:bg-gray-500 hover: text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Login
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover: text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div
                ref={ref}
                className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center"
              >
                <Link
                  to="/userinfo"
                  className="text-gray-300 hover:bg-gray-500 hover: text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
                >
                  User Info
                </Link>
                <Link
                  to="/userinfoform"
                  className="text-gray-300 hover:bg-gray-500 hover: text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
                >
                  UserInfo Form
                </Link>
                {user?.email || user?.name ? (
                  <Link
                    to="/"
                    onClick={handleLogOut}
                    className="text-gray-300 hover:bg-gray-500 hover: text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-gray-500 hover: text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
};

export default Header;
