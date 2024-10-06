import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '176ebc168ce80e7b8c20f6115ad40054',
    },
});

const handleResponse = (response) => response.data;

export const fetchMovies = async (category) => {
    try {
        const response = await apiClient.get(`/movie/${category}`);
        return handleResponse(response).results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const fetchTVShows = async (category) => {
    try {
        const response = await apiClient.get(`/tv/${category}`);
        return handleResponse(response).results;
    } catch (error) {
        console.error('Error fetching TV shows:', error);
        throw error;
    }
};

export const fetchMovieDetails = async (id) => {
    try {
        const response = await apiClient.get(`/movie/${id}`);
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

export const fetchTVShowDetails = async (id) => {
    try {
        const response = await apiClient.get(`/tv/${id}`);
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching TV show details:', error);
        throw error;
    }
};

export const searchMoviesOrTVShows = async (query, type) => {
    try {
        const response = await apiClient.get(`/search/${type}`, {
            params: {
                query,
            },
        });
        return handleResponse(response).results;
    } catch (error) {
        console.error('Error searching movies or TV shows:', error);
        throw error;
    }
};
