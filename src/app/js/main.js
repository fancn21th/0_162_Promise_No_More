//#region Setup
const API_URL = "https:/starwars.egghead.training/";

const output = document.getElementById("app");
const loading = document.getElementById("loading");

const render = (content = "loading...") => (output.innerText = content);

const getFirmTitles = (films) => {
  return films
    .sort((a, b) => a.episode_id - b.episode_id)
    .map((film) => `${film.episode_id}. ${film.title}`)
    .join("\n");
};
//#endregion

render();

Promise.resolve($.getJSON(`${API_URL}films`))
  .then((films) => {
    render(getFirmTitles(films));
  })
  .catch((error) => {
    console.warn(error);
    render(":(");
    return [];
  })
  .finally(() => {
    loading.remove();
  })
  .then((films) => console.log(films));
