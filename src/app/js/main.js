const API_URL = "https:/starwars.egghead.training/";

const output = document.getElementById("app");

const render = (content = "loading...") => (output.innerText = content);

const getFirmTitles = (films) => {
  return films
    .sort((a, b) => a.episode_id - b.episode_id)
    .map((film) => `${film.episode_id}. ${film.title}`)
    .join("\n");
};

render();

fetch(`${API_URL}films`)
  .then((response) => response.json())
  .then((films) => {
    render(getFirmTitles(films));
  });
