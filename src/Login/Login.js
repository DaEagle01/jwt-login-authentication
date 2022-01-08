import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useAuth from "../hook/useAuth";

const Login = () => {
  const [data, setData] = useState({});
  const [errorMessage, setError] = useState("");
  //   const location = useLocation();
  const history = useHistory();

  const { user, handleSignIn, isLoading, logOut, error } = useAuth();

  const handleSignInInfo = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    const newdata = { ...data };
    newdata[field] = value;
    setData(newdata);
    if (user) {
      field = "";
    }

    console.log(data);
  };
  const handleEmailPassSignIn = (e) => {
    console.log(data.email);
    handleSignIn(data.email, data.password, history)
      .then((result) => {
        console.log("login successfull!");
        alert("login successfull!");
      })
      .catch((error) => {
        setError(error.message);
      });
    e.preventDefault();
  };
  return (
    <div className="grid justify-items-center content-center bg-gray-700 h-screen">
      <div
        className="bg-gray-800 w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12
        text-left "
      >
        <div className="w-full h-100">
          <h1 className="text-xl text-white md:text-2xl font-bold leading-tight mt-12 text-center">
            Log in to your account
          </h1>

          <form className="mt-6" onSubmit={handleEmailPassSignIn}>
            <div>
              <label className="block text-white font-">Email Address</label>
              <input
                type="email"
                name="email"
                onBlur={handleSignInInfo}
                id="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-white">Password</label>
              <input
                type="password"
                name="password"
                onBlur={handleSignInInfo}
                id="password"
                placeholder="Enter Password"
                minlength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
              />
            </div>
            <button
              onClick={handleEmailPassSignIn}
              type="submit"
              placeholder="Log In"
              className="w-full block bg-gray-700 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>
          {isLoading && (
            <button type="button" className="bg-gray-600 ..." disabled>
              <svg
                className="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              ></svg>
              Processing
            </button>
          )}
          {user?.email && isLoading && <alert>Login successfully!</alert>}
          {error && <alert>{error}</alert>}
          <hr className="my-6 border-gray-300 w-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
