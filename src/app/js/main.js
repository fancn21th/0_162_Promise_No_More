const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

promise.then(
  () => console.log("fulfilled"),
  () => console.log("rejected")
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

sleep(1000).then(() => console.log("sleep 1s ... then fulfilled"));
