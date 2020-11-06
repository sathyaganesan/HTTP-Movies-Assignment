import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({movies}) {
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
         
        ))
      }
      <Link to = "/addnewmovie">
        <button>Add New Movie</button>
        </Link>
    </div>
  );
}

export default MovieList;
