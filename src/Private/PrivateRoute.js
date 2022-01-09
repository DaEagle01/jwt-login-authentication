import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../hook/useAuth";
import useFirebase from "../hook/useFirebase";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  //  console.log(user);
  if (isLoading) {
    return (
      <div class="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <div>
      <Route
        {...rest}
        render={({ location }) =>
          user?.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;
