import axios from 'axios';

const API_KEY = 'edf34fefb276e900b23acfa400d77b4a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query = '') => {
    try {
        // Determine the URL based on whether a query is provided
        const url = query
            ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
            : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

        console.log('Fetching URL:', url); // Debugging URL
        // Fetch movie data
        const response = await axios.get(url);
        console.log('API Response:', response.data); // Debugging response data
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};
