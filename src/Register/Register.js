import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../hook/useAuth";

const Register = () => {
  const [data, setData] = useState({});
  const history = useHistory();
  const { user, registerUser, isLoading, error } = useAuth();

  const handleRegisterInfo = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newdata = { ...data };
    newdata[field] = value;
    setData(newdata);
  };
  const handleRegister = (e) => {
    if (data.password !== data.password2) {
      alert("Your password did not match");
      return;
    }
    registerUser(data.email, data.password, data.name);
    // history.push("/home");
    e.preventDefault();
  };
  return (
    <div>
      <div className="grid bg-gray-700 min-h-screen place-items-center text-left text-white">
        <div className="w-11/12 p-12 bg-gray-800 sm:w-8/12 md:w-1/2 lg:w-5/12">
          <h1 className="text-xl font-semibold text-center text-white">
            Please, Register
          </h1>
          {!isLoading && (
            <form className="mt-6" onSubmit={handleRegister}>
              <span className="w-1/2">
                <label
                  for="Fullname"
                  className="block text-xs font-semibold text-white uppercase"
                >
                  Fullname
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onBlur={handleRegisterInfo}
                  placeholder="Abd Ullah"
                  autoComplete="given-name"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  required
                />
              </span>

              <label
                for="email"
                className="block mt-2 text-xs font-semibold text-white uppercase"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                name="email"
                onBlur={handleRegisterInfo}
                placeholder="john.doe@company.com"
                autoComplete="email"
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
              <label
                for="password"
                className="block mt-2 text-xs font-semibold text-white uppercase"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                onBlur={handleRegisterInfo}
                placeholder="********"
                autoComplete="new-password"
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
              <label
                for="password-confirm"
                className="block mt-2 text-xs font-semibold text-white uppercase"
              >
                Confirm password
              </label>
              <input
                id="password-confirm"
                type="password"
                name="password2"
                onBlur={handleRegisterInfo}
                placeholder="********"
                autoComplete="new-password"
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
              <button
                type="submit"
                className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gray-600 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
              >
                Sign up
              </button>
              <p className=" inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">
                Already registered?{" "}
                <Link
                  to="/login"
                  style={{ textDecoration: "none" }}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Login here
                </Link>
              </p>
            </form>
          )}
          {isLoading && (
            <button type="button" className="bg-rose-600 ..." disabled>
              <svg
                className="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              ></svg>
              Processing
            </button>
          )}
          {user?.email && isLoading && (
            <alert severity="success">User Created successfully!</alert>
          )}
          {error && <alert severity="error">{error}</alert>}
        </div>
      </div>
    </div>
  );
};

export default Register;
