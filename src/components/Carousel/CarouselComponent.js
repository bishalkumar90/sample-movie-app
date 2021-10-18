import React, { useCallback, useRef } from "react";
import { Form } from "react-bootstrap";
import Poster from "../Poster/Poster";

import { ReactComponent as PrevArrow } from "../../asset/arrow_back_ios_black_24dp.svg";
import { ReactComponent as NextArrow } from "../../asset/arrow_forward_ios_black_24dp.svg";

const CarouselComponent = ({
  movies = [],
  genres = [],
  selectedMovie = { index: 0, id: "" },
  onChangeGenre = () => {},
  onMovieClick = () => {},
}) => {
  const carouselRef = useRef({});

  const handleChangeGenre = useCallback(
    (e) => {
      onChangeGenre(e.target.value);
    },
    [onChangeGenre]
  );

  if (movies.length === 0) {
    return <h2>No movies found.</h2>;
  }

  const onNextClick = () => {
    carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
  };

  const onPrevClick = () => {
    carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
  };

  const renderPoster = () => {
    return (
      <>
        {movies.map((item) => (
          <Poster
            selected={item.Id === selectedMovie.id}
            key={item.Id}
            onClick={() => onMovieClick(item.Id)}
            className="mx-2 poster"
            src={item.Poster || ""}
            alt="Movie Poster"
          />
        ))}
      </>
    );
  };

  return (
    <section className="pb-3 w-100 carousel-container">
      <div className="w-100 mr-3 d-flex justify-content-end">
        <Form.Select
          onChange={handleChangeGenre}
          className="py-1 carousel-select"
        >
          <option value={"All"}>All</option>
          {genres.sort().map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Form.Select>
      </div>
      <div className="mt-4 w-100 d-flex flex-row justity-content-center align-items-center">
        <div>
          <PrevArrow className="carousel-arrow mx-3" onClick={onPrevClick} />
        </div>
        <div ref={carouselRef} className="carousel">
          {renderPoster()}
        </div>
        {/* </Slider> */}
        <div>
          <NextArrow className="carousel-arrow mx-3" onClick={onNextClick} />
        </div>
      </div>
    </section>
  );
};

export default CarouselComponent;
