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

fetch(`${API_URL}films`)
  .then((response) => {
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

// fetch(`${API_URL}films`)
//   .then((response) => {
//     return response.json().then((films) => render(getFirmTitles(films)));
//   })
//   .catch((error) => {
//     console.warn(error);
//     render(":(");
//   })
//   .then(
//     () => {
//       loading.remove();
//     },
//     () => {
//       loading.remove();
//     }
//   );

// Promise Chain 末端处理 错误
// fetch(`${API_URL}films`)
//   .then((response) => {
//     return Promise.reject("invalid json").then((films) =>
//       render(getFirmTitles(films))
//     );
//   })
//   .then(undefined, (error) => {
//     console.warn(error);
//     render(":(");
//   });

// 一个 Promise Settled 状态组 下 2种不同状态的回掉
// fetch(`${API_URL}films`).then(
//   // onFulfilled
//   (response) => console.log(response),
//   // onRejected
//   (error) => console.error(error)
// );

// 正常场景
// fetch(`${API_URL}films`)
//   .then((response) => response.json())
//   .then((films) => {
//     render(getFirmTitles(films));
//   });
