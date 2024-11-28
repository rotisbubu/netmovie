import React, { useState } from "react";
import "../style.css";
import MovieCard from "./movieCard";

type Movie = {
  id: string;
  title: string;
  image: string;
  genre: string;
  rating: number;
};

type MoviesGridProps = {
  movies: Movie[];
  watchlist: string[]; // Add watchlist as a prop
  toggleWatchlist: (movieId: string) => void;
};

export default function MoviesGrid({
  movies,
  watchlist,
  toggleWatchlist,
}: MoviesGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };
  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRating(e.target.value);
  };

  const matchesGenre = (movie: Movie, genre: string): boolean => {
    return (
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };
  const matchesSearchTerm = (movie: Movie, searchTerm: string): boolean => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
  const matchesRating = (movie: Movie, rating: any) => {
    switch (rating) {
      case "All":
        return true;
      case "Good":
        return movie.rating >= 8.5;
      case "Average":
        return movie.rating >= 7 && movie.rating < 8.5;
      case "Bad":
        return movie.rating < 7;
      default:
        return false;
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearchTerm(movie, searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Romance</option>
            <option>Thriller</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Average</option>
            <option>Bad</option>
          </select>
        </div>
      </div>
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            isWatchlisted={watchlist.includes(movie.id)} // Check if the movie is in the watchlist
            toggleWatchlist={toggleWatchlist} // Pass the toggleWatchlist handler
          />
        ))}
      </div>
    </div>
  );
}
