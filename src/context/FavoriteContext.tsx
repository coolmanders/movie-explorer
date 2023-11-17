import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { Movie } from "../types/Movie";

interface FavoriteContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (imdbID: string) => void;
  isFavorite: (imdbID: string) => boolean;
}

export const FavoriteContext = createContext<FavoriteContextType | null>(null);

interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  const addFavorite = (movie: Movie) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...favorites, movie];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      return [...prevFavorites, movie];
    });
  };

  const removeFavorite = (imdbID: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter(
        (movie) => movie.imdbID !== imdbID
      );

      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      return newFavorites;
    });
  };

  const isFavorite = (imdbID: string) => {
    return favorites.some((movie) => movie.imdbID === imdbID);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
};
