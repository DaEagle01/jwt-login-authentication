import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import initializeAuthentication from "../firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();
  // console.log(user);
  const registerUser = (email, password, name) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        setError("");
        const newUser = { email, displayName: name };
        setUser(newUser);
        alert("new user created");
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSignIn = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
        alert("user just logged out");
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  };

  const email = user?.email;
  console.log(email);
  // useEffect(() => {
  //   fetch(`http://localhost:5000/users/${email}`)
  //     .then((res) => res.json())
  //     .then((data) => setAdmin(data?.admin));
  // }, [user.email]);

  // const saveUser = (email, displayName, method) => {
  //   const user = { email, displayName };
  //   console.log(user);
  //   fetch("http://localhost:5000/users", {
  //     method: method,
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify(user),
  //   }).then();
  // };

  return {
    registerUser,
    handleSignIn,
    admin,
    // saveUser,
    user,
    logOut,
    error,
    isLoading,
  };
};

export default useFirebase;
