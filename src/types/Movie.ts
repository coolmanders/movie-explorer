export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster?: string;
    Genre?: string;
    Director?: string;
    Actors?: string;
    Plot?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Ratings?: Array<{ Source: string; Value: string }>;
  }
  
  export interface MovieSearchResult {
    movies: Movie[];
    totalResults: number;
  }