import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userAcc, setUserAcc] = useState();
  const DATABASE_URL =
    "https://authentication-movie-app-default-rtdb.firebaseio.com/users.json";

  function signup(auth, email, password) {
    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
      setUserAcc(cred.user.uid);
      const db = getDatabase();
      set(ref(db, "users/" + cred.user.uid), {
        userID: cred.user.uid,
      });
      // fetch(DATABASE_URL, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     id: cred.user.uid,
      //     favMovies: [],
      //   }),
      // });
    });
  }

  function login(auth, email, password) {
    signInWithEmailAndPassword(auth, email, password).then((cred) => {
      setUserAcc(cred.user.uid);
    });
  }

  function signout(auth) {
    signOut(auth).then(() => {
      setUserAcc("");
      console.log("Signout successful");
    });
  }

  console.log(userAcc);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userAcc,
    signup,
    login,
    signout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
