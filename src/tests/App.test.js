import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MetasComponent from "../components/Metas/MetasComponent";
import CarouselComponent from "../components/Carousel/CarouselComponent";
import mockData from "./mock/data";

const listGenre = [
  ...new Set(
    mockData
      .reduce((acc, cur) => `${acc ? acc + ", " : ""}${cur.Genre}`, "")
      .split(", ")
  ),
];

test("it should render the correct selected item", () => {
  render(<MetasComponent movie={mockData[0]} />);
  const titleElem = screen.getAllByText(mockData[0].Title);
  titleElem.forEach((item) => {
    expect(item).toBeInTheDocument();
  });
});

test("it should render the correct list genre", () => {
  render(<CarouselComponent movies={mockData} genres={listGenre} />);
  listGenre.forEach((genre) => {
    const genreElem = screen.getByText(genre);
    expect(genreElem).toBeInTheDocument();
  });
});

test("it should render the correct list movies", () => {
  render(<CarouselComponent movies={mockData} genres={listGenre} />);
  const posters = screen.getAllByAltText(/movie poster/i);

  mockData.forEach((movie, index) => {
    const srcElemText = posters[index].getAttribute("src");
    expect(srcElemText).toEqual(movie.Poster);
  });
});
