const API_URL = "http://run.mocky.io/v3/d03e0886-f5c8-4961-902d-51bfe8059a33";

export const getMovies = () => {
  return fetch(API_URL)
    .then((resp) => resp.json())
    .then((data) => {
      const listGenre = new Set();
      data.forEach((item) => {
        const genre = item.Genre.split(", ");
        genre.forEach((g) => {
          listGenre.add(g);
        });
      });
      return {
        movies: data,
        genres: listGenre,
      };
    });
};
