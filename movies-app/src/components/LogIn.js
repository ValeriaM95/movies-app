import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      if (emailRef.current.value !== "" && passwordRef.current.value !== "") {
        login(auth, emailRef.current.value, passwordRef.current.value);
        navigate("/account");
      }
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <section className={classes.authentication}>
      <h2 className={classes.title}>Log In</h2>
      {/* {currentUser && currentUser.email} */}
      {error && <p>{error}</p>}
      <form className={classes.login_form} onSubmit={handleSubit}>
        <label htmlFor="email">E-mail</label>
        <input type="email" ref={emailRef} id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" ref={passwordRef} is="password" />
        <button type="submit" disabled={loading}>
          Log in
        </button>
      </form>
      <div className={classes.switch}>
        <Link to="/signup">Sign up</Link>
      </div>
    </section>
  );
}
