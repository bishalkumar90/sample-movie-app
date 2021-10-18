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
        <div className="row">
          {Object.keys(curMovie).map((key) => {
            const value = movie[key];
            if (IGNORE_PROPS.includes(key) || value === "N/A") {
              return null;
            }
            if (FIRST_PROPS.includes(key) && windowW <= 1400) {
              return null;
            }
            return (
              <div key={key} className="col-12 col-xxl-6 col-lg-12 text-start">
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
    <div className="w-100 mt-3 px-2">
      <div className="w-100 lg-title">
        <h1>{movie.Title || "Title"}</h1>
        <div className="w-100 lg-meta-content">
          {Object.keys(movie).map((key) => {
            const value = movie[key];
            if (value === "N/A") {
              return null;
            }
            if (FIRST_PROPS.includes(key)) {
              return (
                <div key={key} className="text-start">
                  <p>
                    <b>{key}:</b> {value}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="w-100 meta-container d-flex justify-content-between align-items-center">
        <div className="h-100 d-flex justify-content-center align-items-center ">
          <img src={movie.Poster || ""} alt="Movie Poster" />
        </div>
        <div className="h-100 px-1">
          <h1 className="mb-4 title">{movie.Title || "Title"}</h1>
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
