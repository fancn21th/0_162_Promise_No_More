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

fetch(`${API_URL}fil2ms`)
  .then((response) => {
    if (!response.ok) {
      // return Promise.reject("Unsuccessful response");
      return Promise.reject(new Error("Unsuccessful response"));
    }

    return response.json().then((films) => render(getFirmTitles(films)));
  })
  .catch((error) => {
    console.warn(error);
    render(":(");
  })
  .finally(() => {
    loading.remove();
  })
  .then((films) => console.log(films));
