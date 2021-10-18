/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

const Poster = ({
  className = "",
  style = {},
  src = "",
  alt = "",
  selected = false,
  onClick = () => {},
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <img
      className={`${className} ${
        selected ? "border border-success border-5" : ""
      }`}
      style={{ ...style }}
      src={src || ""}
      alt={alt}
      onClick={onClick}
    />
  );
};

export default Poster;
