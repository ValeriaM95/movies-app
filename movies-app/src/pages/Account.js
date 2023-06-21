import classes from "./Account.module.css";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import MoviesGrid from "../components/UI/MoviesGrid";
import Button from "../components/UI/Button";

function Account() {
  const { currentUser, signout } = useAuth();
  const [moviesList, setMoviesList] = useState();

  const navigate = useNavigate();

  async function getInfoFromDatabase() {
    const resp = await fetch(
      `https://authentication-movie-app-default-rtdb.firebaseio.com/users/${currentUser.uid}/favmovies.json`
    );
    const data = await resp.json();

    const loadedData = [];
    for (const key in data) {
      loadedData.push({
        id: data[key].id,
        title: data[key].title,
        poster_path: data[key].poster_path,
        vote_average: data[key].vote_average,
        overview: data[key].overview,
      });
    }

    setMoviesList(loadedData);
  }

  useEffect(() => {
    getInfoFromDatabase();
  }, []);

  if (!currentUser) {
    return <Navigate to="/signup" replace />;
  }

  function handleLogOut() {
    signout(auth);
    setMoviesList("");
    navigate("/login");
  }

  return (
    <>
      <section>
        <div className={classes.account_header}>
          <div className={classes.title_wrapper}>
            <h1 className="genre-title">Profile</h1>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
          </div>
          <div className={classes.btn}>
            <Button btnTitle="Log Out" onClick={handleLogOut} />
          </div>
        </div>
        <div className={classes.moviesList}>
          <h1>Favorite movies</h1>
        </div>
      </section>
      <section className="movies_wrapper">
        {moviesList && <MoviesGrid moviesList={moviesList} />}
      </section>
    </>
  );
}

export default Account;
