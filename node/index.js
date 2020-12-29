const timeout = (ms, promise) => {
  let timeoutID;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutID = setTimeout(() => {
      reject(Error(`Operation timed out after ${ms} ms`));
    }, ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutID); // 避免 进程继续执行
  });
};

const resolveAfter = (ms, value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
};

const promise = resolveAfter(1000, "A");

timeout(5000, promise).then(
  (response) => console.log(response),
  (error) => console.error(error.message)
);
