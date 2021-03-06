import React, { useState, useMemo, useEffect, useCallback } from "react";
import MetasComponent from "../components/Metas/MetasComponent";
import CarouselComponent from "../components/Carousel/CarouselComponent";

import { getMovies } from "../utils/api";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({ index: 0, id: "" });
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [errorLoading, setErrorLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    getMovies()
      .then((data) => {
        setMovies(data.movies);
        setGenres([...data.genres]);
        setSelectedMovie({ index: 0, id: data.movies.Id });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorLoading(true);
      });
  }, []);

  const onChangeGenre = useCallback(
    (nextGenre) => {
      setSelectedGenre(nextGenre);
    },
    [setSelectedGenre]
  );
  const onSelectMovie = useCallback(
    (nextMovie) => {
      const index = movies.findIndex((item) => item.Id === nextMovie);
      if (index > -1) {
        setSelectedMovie({ index, id: movies[index].Id });
      }
    },
    [movies]
  );
  const listDisplayMovie = useMemo(() => {
    if (selectedGenre === "All") {
      return movies;
    }
    const result = movies.filter((movie) =>
      movie.Genre.includes(selectedGenre)
    );
    return result;
  }, [movies, selectedGenre]);

  if (errorLoading) {
    return (
      <h1 className="error position-absolute top-50">
        There is an error when we trying to fetch data. Please try again.
      </h1>
    );
  }
  if (loading) {
    return <h1 className="loader position-absolute top-50">Loading</h1>;
  }

  return (
    <main className="App container-fluid">
      <MetasComponent
        movie={movies[selectedMovie.index]}
        windowWidth={windowWidth}
      />
      <CarouselComponent
        windowWidth={windowWidth}
        movies={listDisplayMovie}
        genres={genres}
        selectedMovie={selectedMovie}
        onChangeGenre={onChangeGenre}
        onMovieClick={onSelectMovie}
      />
    </main>
  );
}

export default App;
