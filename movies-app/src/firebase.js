import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-oTtJmNAuzu8LzMG_0h87uMePrqVBQsg",
  authDomain: "authentication-movie-app.firebaseapp.com",
  projectId: "authentication-movie-app",
  storageBucket: "authentication-movie-app.appspot.com",
  messagingSenderId: "53978856778",
  appId: "1:53978856778:web:d2b542e76bb626c20255b3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
