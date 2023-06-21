import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import classes from "./MoviesGrid.module.css";
import noImg from "../../assets/no-image.svg";

export default function MoviesGrid({ moviesList }) {
  const IMG_PATH = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      {moviesList &&
        moviesList.map((movie) => {
          const { id, title, poster_path, vote_average, overview } = movie;
          return (
            <div key={id} className={classes.movie_container}>
              <Link to={`/movies/${id}`}>
                <FaEye />
              </Link>
              {!poster_path && (
                <img
                  src={noImg}
                  className={classes.movie_poster}
                  alt="Poster of the movie"
                />
              )}
              {poster_path && (
                <img
                  src={IMG_PATH + poster_path}
                  className={classes.movie_poster}
                  alt="Poster of the movie"
                />
              )}

              <div className={classes.movie_description}>
                <h3 className={classes.title}>
                  {title.length > 25 ? title.substring(0, 25) + "..." : title}
                  {/* {title} */}
                </h3>
                <span
                  className={
                    vote_average < 7
                      ? classes.low
                      : vote_average <= 8 && vote_average >= 7
                      ? classes.middle
                      : classes.high
                  }
                >
                  {vote_average.toFixed(1)}
                </span>
              </div>
              <p className={classes.overview}>
                {overview.length > 300
                  ? overview.substring(0, 300) + "..."
                  : overview}
              </p>
            </div>
          );
        })}
    </>
  );
}
