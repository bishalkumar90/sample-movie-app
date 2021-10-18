import React, { useState, useEffect } from "react";
import MetasComponent from "../components/Metas/MetasComponent";

import { getMovies } from "../utils/api";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({ index: 0, id: "" });
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
        setSelectedMovie({ index: 0, id: data.movies.Id });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorLoading(true);
      });
  }, []);

  if (errorLoading) {
    return (
      <h1>There is an error when we trying to fetch data. Please try again.</h1>
    );
  }
  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="App container-fluid">
      <MetasComponent
        movie={movies[selectedMovie.index]}
        windowWidth={windowWidth}
      />
    </div>
  );
}

export default App;
