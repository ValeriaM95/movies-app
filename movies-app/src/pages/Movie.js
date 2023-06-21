import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import classes from "./Movie.module.css";
import Button from "../components/UI/Button";

function Movie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const { currentUser } = useAuth();
  const URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=249f77f74a3cff2532da3bf70cb40ebf`;
  const IMG_PATH = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    async function loadMovie() {
      const resp = await fetch(URL);
      const data = await resp.json();
      setMovie(data);
    }

    loadMovie();
  }, []);

  useEffect(() => {
    const reset = setTimeout(() => {
      setShowAlert(false);
    }, 1500);

    return () => clearTimeout(reset);
  }, [showAlert]);

  async function addToDatabase() {
    await fetch(
      `https://authentication-movie-app-default-rtdb.firebaseio.com/users/${currentUser.uid}/favmovies/.json`,
      {
        method: "POST",
        body: JSON.stringify({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          overview: movie.overview,
        }),
      }
    );
  }

  function addMovieToLikesList() {
    if (currentUser) {
      addToDatabase();
      setAlertText("Movie was added");
      setShowAlert(true);
    } else {
      setAlertText("Please log in");
      setShowAlert(true);
    }
  }

  const {
    genres,
    status,
    vote_average,
    vote_count,
    poster_path,
    release_date,
    overview,
    title,
  } = movie;
  return (
    <section className={classes.wrapper}>
      <div>
        <div>
          <div className={classes.main_info_container}>
            <h1>{title}</h1>
            <div className={classes.info}>
              <div className={classes.title}>
                <p>Released in {new Date().getFullYear(release_date)}</p>
                <p>Status: {status}</p>
              </div>
              <div className={classes.rating}>
                <h2>TMDB RATING</h2>
                <p>
                  <AiFillStar className={classes.starIcon} />
                  {vote_average && vote_average.toFixed(2)}/10
                </p>
                <p>Users voted: {vote_count}</p>
              </div>
            </div>
          </div>
          <div className={classes.genres}>
            Genres:{" "}
            {genres &&
              genres.map((genre) => (
                <Link to={`/genres/${genre.id}`}>
                  <span>{genre.name}</span>
                </Link>
              ))}
          </div>
        </div>
        <p className={classes.overview}>{overview}</p>
        <Button btnTitle="Add to Favorite" onClick={addMovieToLikesList} />
        {showAlert && <p className={classes.alert}>{alertText}</p>}
      </div>

      <img
        src={`${IMG_PATH + poster_path}`}
        alt="Movie Poster"
        className={classes.moviePoster}
      />
    </section>
  );
}

export default Movie;
