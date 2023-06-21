import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MoviesGrid from "../components/UI/MoviesGrid";

function SingleGenre() {
  const { genreId } = useParams();
  const [moviesGenreData, setMoviesGenreData] = useState([]);
  const SEARCH_MOVIES_BY_GENRE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=249f77f74a3cff2532da3bf70cb40ebf&with_genres=${genreId}`;

  const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  useEffect(() => {
    async function loadMoviesByGenre() {
      const response = await fetch(SEARCH_MOVIES_BY_GENRE_URL);
      const data = await response.json();
      const extractedMovies = data.results;
      setMoviesGenreData(extractedMovies);
      console.log(data);
    }

    loadMoviesByGenre();
  }, []);

  return (
    <>
      <h1 className="genre-title">Genres: {genres[genreId]}</h1>
      <section className="movies_wrapper">
        <MoviesGrid moviesList={moviesGenreData} />
      </section>
    </>
  );
}

export default SingleGenre;
