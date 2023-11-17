import React, { useState, useEffect } from "react";

import {
  Box,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Grid,
  Pagination,
} from "@mui/material";

import { useFavorites } from "../../context/FavoriteContext";
import { searchMovies } from "../../services/movieService";
import { Movie } from "../../types/Movie";

import useDebounce from "../../hooks/useDebounce";

import Item from "./Item";

const List: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [movies, setMovies] = useState<Movie[]>([]);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const { favorites } = useFavorites();

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (debouncedQuery) {
      searchMovies(debouncedQuery, currentPage)
        .then((results) => {
          setMovies(results.movies);
          setTotalPages(Math.ceil(results.totalResults / 10));
          setError("");
          setOpenSnackbar(false);
        })
        .catch((error) => {
          setError(error.message);
          setTotalPages(0);
          setMovies([]);
          setOpenSnackbar(true);
        });
    } else {
      setMovies([]);
      setTotalPages(0);
    }
  }, [debouncedQuery, currentPage]);

  useEffect(() => {
    if (debouncedQuery) {
      setCurrentPage(1);
    }
  }, [debouncedQuery]);

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const toggleShowFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  return (
    <>
      <ToggleButtonGroup
        value={showFavorites ? "favorites" : "all"}
        exclusive
        onChange={toggleShowFavorites}
        aria-label="Show favorites or all movies"
        sx={{ display: "flex", justifyContent: "center", py: 2 }}
      >
        <ToggleButton value="all" aria-label="All movies">
          All Movies
        </ToggleButton>
        <ToggleButton value="favorites" aria-label="Favorites">
          Favorites
        </ToggleButton>
      </ToggleButtonGroup>
      {showFavorites ? (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Item key={movie.imdbID} movie={movie} />
          ))}
        </Grid>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", p: 2, pb: 5 }}>
            <TextField
              label="Search for a movie"
              variant="outlined"
              autoComplete="off"
              value={query}
              onChange={handleSearch}
              sx={{ width: "100%", maxWidth: 600 }}
            />
          </Box>
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <Item key={movie.imdbID} movie={movie} />
            ))}
          </Grid>
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              py: 2,
              backgroundColor: "background.paper",
              zIndex: 10,
            }}
          >
            {totalPages > 1 && (
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_event, page) => setCurrentPage(page)}
              />
            )}
          </Box>
        </>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={error}
      />
    </>
  );
};

export default List;
