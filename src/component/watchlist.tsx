import React from "react";
import "../style.css";
import MovieCard from "./movieCard";

type Movie = {
  id: string;
  title: string;
  image: string;
  genre: string;
  rating: number;
};

type WatchlistProps = {
  watchlist: string[];
  movies: Movie[];
  toggleWatchlist: (movieId: string) => void;
};

export default function Watchlist({
    watchlist,
    movies,
    toggleWatchlist,
  }: WatchlistProps) {
    // Filter movies that are in the watchlist
    const watchlistMovies = movies.filter((movie) => watchlist.includes(movie.id));
  
    return (
      <div>
        <h1 className="title">Your Watchlist</h1>
        {watchlistMovies.length > 0 ? (
          <div className="watchlist">
            {watchlistMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                toggleWatchlist={toggleWatchlist}
                isWatchlisted={true}
              />
            ))}
          </div>
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </div>
    );
  }
