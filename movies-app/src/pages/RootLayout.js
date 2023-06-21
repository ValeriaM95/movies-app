import { Outlet } from "react-router";
import classes from "./RootLayout.module.css";
import Header from "../components/Header";

function Root(props) {
  return (
    <>
      <Header
        moviesList={props.moviesList}
        setMoviesList={props.setMoviesList}
      />
      <main className={classes.wrapper}>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
