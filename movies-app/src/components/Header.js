import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import classes from "./Header.module.css";

function Header({ setMoviesList }) {
  const inputValue = useRef();
  const [searchMovie, setSearchMovie] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const SEARCH_URL =
    "https://api.themoviedb.org/3/search/movie?api_key=249f77f74a3cff2532da3bf70cb40ebf&query='";
  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=249f77f74a3cff2532da3bf70cb40ebf&page=1";

  useEffect(() => {
    async function fetchMovies() {
      let response;
      if (searchMovie === "" || !searchMovie) {
        response = await fetch(API_URL);
      } else {
        response = await fetch(SEARCH_URL + searchMovie);
      }
      const data = await response.json();
      const moviesData = data.results;
      setMoviesList(moviesData);
    }
    fetchMovies();
  }, [searchMovie]);

  function submitFormHandler(e) {
    e.preventDefault();
    setSearchMovie(searchTerm);
    if (searchMovie) {
      navigate("/", { state: searchMovie, replace: true });
    }
    setSearchTerm("");
  }

  return (
    <header className={classes.header}>
      <Link>
        <h1 className={classes.logo}>TMDB</h1>
      </Link>
      <div className={classes.menu}>
        <nav>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/account"
              >
                Account
              </NavLink>
            </li>
          </ul>
        </nav>
        <form className="form" onSubmit={submitFormHandler}>
          <input
            type="text"
            className="search"
            placeholder="search"
            value={searchTerm}
            ref={inputValue}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
}

export default Header;
