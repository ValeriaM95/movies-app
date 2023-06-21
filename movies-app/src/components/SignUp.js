import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);

      if (emailRef.current.value !== "" && passwordRef.current.value !== "") {
        signup(auth, emailRef.current.value, passwordRef.current.value);
        navigate("/account");
      }
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <section className={classes.authentication}>
      <h2 className={classes.title}>Sign Up</h2>
      <form className={classes.login_form} onSubmit={handleSubit}>
        <label htmlFor="email">E-mail</label>
        <input type="email" ref={emailRef} id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" ref={passwordRef} is="password" />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" ref={confirmPasswordRef} id="confirm-password" />
        <button type="submit" disabled={loading}>
          Sign up
        </button>
      </form>
      <div className={classes.switch}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </section>
  );
}
