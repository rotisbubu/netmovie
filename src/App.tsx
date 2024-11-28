import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./component/header";
import Footer from "./component/footer";
import MoviesGrid from "./component/moviesGrid";
import Watchlist from "./component/watchlist";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

type Movie = {
  id: string;
  title: string;
  image: string;
  genre: string;
  rating: number;
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    fetch("movies.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Movie[]) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const toggleWatchlist = (movieId: string) => {
    setWatchlist((prev: string[]) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Header></Header>

        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <MoviesGrid
                  movies={movies}
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            ></Route>
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  watchlist={watchlist}
                  movies={movies}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App;
