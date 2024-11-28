import React from "react";
import "../style.css";

type Movie = {
  id: string;
  title: string;
  image: string;
  genre: string;
  rating: number;
};

type MovieCardProps = {
  movie: Movie;
  isWatchlisted: boolean; // Add isWatchlisted prop
  toggleWatchlist: (movieId: string) => void; // Add toggleWatchlist prop
};

export default function MovieCard({
  movie,
  isWatchlisted,
  toggleWatchlist,
}: MovieCardProps) {
  // Handling Image Error
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "images/default.jpg";
  };

  // Dynamic Rating Color
  const getRatingClass = (rating: number) => {
    if (rating >= 8.5) return "rating-good";
    if (rating >= 7) return "rating-average";
    return "rating-bad";
  };

  return (
    <div>
      <div key={movie.id} className="movie-card">
        <img
          src={`images/${movie.image}`}
          alt={movie.title}
          onError={handleError}
        />
        <div className="movie-card-info">
          <h2>{movie.title}</h2>
          <div>
            <span className="movie-genre">Genre: {movie.genre}</span>
            <span className={`movie-rating ${getRatingClass(movie.rating)}`}>
              {movie.rating}
            </span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={isWatchlisted}
              onChange={() => toggleWatchlist(movie.id)}
            ></input>

            <span className="slider">
              <span className="slider-label">
                {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
              </span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
