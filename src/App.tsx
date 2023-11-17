import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";

import NavBar from "./components/Navbar";

import { FavoriteProvider } from "./context/FavoriteContext";

const MovieList = lazy(() => import("./components/Movie/List"));
const MovieDetail = lazy(() => import("./components/Movie/Detail"));

const App: React.FC = () => (
  <FavoriteProvider>
    <Router>
      <NavBar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                }
              >
                <MovieList />
              </Suspense>
            }
          />
          <Route
            path="/movie/:imdbID"
            element={
              <Suspense
                fallback={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />{" "}
                  </Box>
                }
              >
                <MovieDetail />
              </Suspense>
            }
          />
        </Routes>
      </Box>
    </Router>
  </FavoriteProvider>
);

export default App;
