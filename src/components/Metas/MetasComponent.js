import React, { useCallback } from "react";

const IGNORE_PROPS = ["Id", "Poster", "Title"];
const FIRST_PROPS = [
  "Plot",
  "Actors",
  "Writer",
  "BoxOffice",
  "Production",
  "Year",
  "Rated",
  "Released",
];

const MetasComponent = ({ movie = {}, windowWidth = 0 }) => {
  const renderListMeta = useCallback(
    (curMovie, windowW) => {
      return (
        <div className="px-2 meta-content d-flex">
          {Object.keys(curMovie).map((key) => {
            const value = movie[key];
            if (IGNORE_PROPS.includes(key) || value === "N/A") {
              return null;
            }
            if (FIRST_PROPS.includes(key) && windowW <= 992) {
              return null;
            }
            return (
              <div key={key} className="text-start meta-item">
                <p>
                  <b>{key}:</b> {value}
                </p>
              </div>
            );
          })}
        </div>
      );
    },
    [movie]
  );

  if (Object.keys(movie).length === 0) {
    return <></>;
  }

  return (
    <div className="w-100">
      <div className="mb-3 w-100 lg-title">
        <h1>{movie.Title || "Title"}</h1>
        <div className="w-100 lg-meta-content">
          {FIRST_PROPS.map((key) => {
            const value = movie[key];
            if (value === "N/A") {
              return null;
            }
            return (
              <div key={key} className="text-start">
                <p>
                  <b>{key}:</b> {value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-100 py-3 meta-container">
        <div className="h-100 d-flex justify-content-center align-items-center ">
          <img src={movie.Poster || ""} alt="Movie Poster" />
        </div>
        <div className="h-100">
          <h1 className="title">{movie.Title || "Title"}</h1>
          {renderListMeta(movie, windowWidth)}
        </div>
      </div>
    </div>
  );
};

const compareProps = (nextProps, prevProps) => {
  return (
    nextProps.movie.Id === prevProps.movie.Id &&
    nextProps.windowWidth === prevProps.windowWidth
  );
};

export default React.memo(MetasComponent, compareProps);
