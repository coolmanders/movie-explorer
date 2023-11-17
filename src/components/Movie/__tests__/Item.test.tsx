import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import {
  FavoriteContext,
  FavoriteProvider,
} from "../../../context/FavoriteContext";

import { Movie } from "../../../types/Movie";

import Item from "../Item";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

const mockMovie: Movie = {
  Title: "Test Movie",
  Year: "2021",
  imdbID: "tt1234567",
  Type: "movie",
  Poster: "test-poster.jpg",
};

describe("MovieItem Component", () => {
  it("renders with movie data", () => {
    render(
      <BrowserRouter>
        <FavoriteProvider>
          <Item movie={mockMovie} />
        </FavoriteProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(mockMovie.Title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.Year)).toBeInTheDocument();
  });

  it("navigates to movie detail on click", () => {
    const mockedUseNavigate = require("react-router-dom").useNavigate;

    mockedUseNavigate.mockReturnValue(jest.fn());

    render(
      <BrowserRouter>
        <FavoriteProvider>
          <Item movie={mockMovie} />
        </FavoriteProvider>
      </BrowserRouter>
    );

    const movieTitleElement = screen.getByText(mockMovie.Title);
    fireEvent.click(movieTitleElement);

    expect(mockedUseNavigate()).toHaveBeenCalled();
  });

  it("adding an item to favorites on icon click", () => {
    const mockAddFavorite = jest.fn();
    const mockRemoveFavorite = jest.fn();
    const mockIsFavorite = jest.fn();

    const MockFavoriteProvider: React.FC<{ children: React.ReactNode }> = ({
      children,
    }) => {
      return (
        <FavoriteContext.Provider
          value={{
            favorites: [],
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
            isFavorite: mockIsFavorite,
          }}
        >
          {children}
        </FavoriteContext.Provider>
      );
    };
    render(
      <BrowserRouter>
        <MockFavoriteProvider>
          <Item movie={mockMovie} />
        </MockFavoriteProvider>
      </BrowserRouter>
    );

    const favoriteIcon = screen.getByTestId("FavoriteIcon");
    fireEvent.click(favoriteIcon);

    expect(mockAddFavorite).toHaveBeenCalledWith(mockMovie);
  });
});
