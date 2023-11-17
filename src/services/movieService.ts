import axios from "axios";

import { MovieSearchResult, Movie } from "../types/Movie";

const API_URL = "http://www.omdbapi.com/";
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieSearchResult> => {
  try {
    const response = await axios.get(
      `${API_URL}?s=${query}&type=movie&page=${page}&apikey=${API_KEY}`
    );

    if (response.data.Response === "False") {
      throw new Error(response.data.Error);
    }

    return {
      movies: response.data.Search,
      totalResults: parseInt(response.data.totalResults, 10),
    };
  } catch (error) {
    throw error;
  }
};

export const fetchMovieDetails = async (imdbID: string): Promise<Movie> => {
  try {
    const response = await axios.get(
      `${API_URL}?i=${imdbID}&apikey=${API_KEY}`
    );
    if (response.data.Response === "False") {
      throw new Error(response.data.Error);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
