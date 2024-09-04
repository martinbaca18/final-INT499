import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMovies } from './tmdbService';
import './Movies.css';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        console.log('Search Query:', query); // Debugging query
        const getMovies = async () => {
            if (query) {
                const movieData = await fetchMovies(query);
                console.log('Movies Data:', movieData); // Debugging movie data
                setMovies(movieData);
            } else {
                setMovies([]);
            }
        };

        getMovies();
    }, [query]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        window.location.href = `/movies?query=${encodeURIComponent(searchQuery)}`;
    };

    return (
        <div className="movies-container">
            <h1>Movie Results</h1>

            {/* Search form */}
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for movies"
                />
                <button type="submit">Search</button>
            </form>

            {/* Display movie search results */}
            <ul className="movie-list">
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <li key={movie.id} className="movie-item">
                            <h3 className="movie-title">{movie.title}</h3>
                            <p className="movie-overview">{movie.overview}</p>
                        </li>
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </ul>
        </div>
    );
};

export default Movies;
