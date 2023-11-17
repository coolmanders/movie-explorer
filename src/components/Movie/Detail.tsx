import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { fetchMovieDetails } from "../../services/movieService";
import { Movie } from "../../types/Movie";

import LoadingSkeleton from "./LoadingSkeleton";
import { useFavorites } from "../../context/FavoriteContext";

const Detail: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    if (!imdbID) {
      setError("Movie was not found.");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchMovieDetails(imdbID)
      .then((data) => {
        setMovie(data);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [imdbID]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container>
        <Typography align="center">Movie was not found.</Typography>
      </Container>
    );
  }

  const handleFavoriteClick = () => {
    if (movie) {
      isFavorite(movie.imdbID)
        ? removeFavorite(movie.imdbID)
        : addFavorite(movie);
    }
  };

  return (
    <Container>
      <IconButton onClick={() => navigate("/")}>
        <ArrowBackIcon />
      </IconButton>
      <Paper elevation={3} sx={{ p: 2, my: 2, position: "relative" }}>
        <Box sx={{ position: "absolute", bottom: 0, right: 0, zIndex: 1 }}>
          <IconButton onClick={handleFavoriteClick}>
            <FavoriteIcon
              color={isFavorite(movie.imdbID) ? "error" : "inherit"}
            />
          </IconButton>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <img
              src={
                movie.Poster !== "N/A" ? movie.Poster : "/movie-placeholder.png"
              }
              alt={movie.Title || "Placeholder"}
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={8} sx={{ pl: { xs: 0, md: 3 } }}>
            <Typography variant="h4" gutterBottom>
              {movie.Title} ({movie.Year})
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Director"
                  secondary={movie.Director || "N/A"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Actors"
                  secondary={movie.Actors || "N/A"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Genre"
                  secondary={movie.Genre || "N/A"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Language"
                  secondary={movie.Language || "N/A"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Country"
                  secondary={movie.Country || "N/A"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Awards"
                  secondary={movie.Awards || "N/A"}
                />
              </ListItem>
              {movie.Ratings &&
                movie.Ratings.map((rating, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={rating.Source}
                      secondary={rating.Value}
                    />
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{movie.Plot}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Detail;
