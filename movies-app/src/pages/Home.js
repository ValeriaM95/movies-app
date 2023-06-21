import Movies from "../components/Movies";

function Home({ moviesList, setMoviesList }) {
  return (
    <>
      <Movies moviesList={moviesList} setMoviesList={setMoviesList} />
    </>
  );
}

export default Home;
