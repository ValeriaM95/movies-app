import { useState } from "react";
// import classes from "./Movies.module.css";
import Loading from "./UI/Loading";
import MoviesGrid from "./UI/MoviesGrid";

function Movies({ setMoviesList, moviesList }) {
  const [loading, setLoading] = useState(false);
  return (
    <section className="movies_wrapper">
      {loading && <h1>Loading...</h1>}
      {!loading && <MoviesGrid moviesList={moviesList} />}
    </section>
  );
}

export default Movies;
