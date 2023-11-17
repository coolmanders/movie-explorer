import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Movie } from "../../types/Movie";
import { useFavorites } from "../../context/FavoriteContext";

interface ItemProps {
  movie: Movie;
}

const Item: React.FC<ItemProps> = ({ movie }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    isFavorite(movie.imdbID)
      ? removeFavorite(movie.imdbID)
      : addFavorite(movie);
  };

  return (
    <Grid item xs={12} md={6} lg={2.4}>
      <Card onClick={handleClick} sx={{ height: "100%", position: "relative" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={
              movie.Poster !== "N/A" ? movie.Poster : "/movie-placeholder.png"
            }
            alt={movie.Title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {movie.Title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {movie.Year}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box sx={{ position: "absolute", bottom: 0, right: 0, zIndex: 1 }}>
          <IconButton onClick={handleFavoriteClick}>
            <FavoriteIcon
              color={isFavorite(movie.imdbID) ? "error" : "inherit"}
            />
          </IconButton>
        </Box>
      </Card>
    </Grid>
  );
};

export default Item;
