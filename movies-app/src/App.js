import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import Root from "./pages/RootLayout";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Account from "./pages/Account";
import Movie from "./pages/Movie";
import Error from "./pages/Error";
import SingleGenre from "./pages/SingleGenre";

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error />,
      element: <Root moviesList={moviesList} setMoviesList={setMoviesList} />,
      children: [
        {
          index: true,
          element: (
            <Home moviesList={moviesList} setMoviesList={setMoviesList} />
          ),
        },
        { path: "/account", element: <Account /> },
        { path: "/signup", element: <SignupPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/movies/:movieId", element: <Movie /> },
        {
          path: "/genres/:genreId",
          element: <SingleGenre />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
