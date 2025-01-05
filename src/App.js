import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = '65aa949f';  // Replace with your OMDB API key

  // Placeholder image URL when poster is not available
  const placeholderImage = 'https://via.placeholder.com/200x300?text=No+Image+Available';

  // Fetch movies from OMDB API
  const fetchMovies = async () => {
    if (query) {
      setLoading(true);
      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div className="App">
      <h1>Movie Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              {/* Use placeholder image if no poster is available */}
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : placeholderImage}
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default App;
