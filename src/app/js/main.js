const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//#region
const state = {
  isLogin: null,
  isLoginInProgress: null,
  token: null,
};

const updateState = (key, value) => {
  state[key] = value;
  console.log(key, value);
};

const getState = (key) => {
  return state[key];
};

//#endregion

const resMap = {
  foo: {
    foo: "hello foo",
  },
  bar: {
    bar: "hello bar",
  },
  baz: {
    baz: "hello baz",
  },
  login: {
    token: "1234567890",
  },
};

// 登录
const login = (loginDelayTime = 100) => {
  updateState("isLoginInProgress", true);

  return sleep(loginDelayTime)
    .then(() => resMap["login"])
    .then((res) => {
      updateState("isLogin", true);
      updateState("isLoginInProgress", false);
      updateState("token", res);
      return res;
    });
};

// 等待登录
const waitForLogin = (loopInterval = 100) => {
  return new Promise(function (resolve, reject) {
    const interval = setInterval(function () {
      if (!getState("isLoginInProgress")) {
        clearInterval(interval);
        resolve();
      }
    }, loopInterval);
  });
};

// 模拟 远程 API

const fetch = (url, time = 100) => {
  if (Math.random() < 1) {
    return sleep(time).then(() => resMap[url]);
  } else {
    return Promise.reject(new Error("ooops!"));
  }
};

// 封装请求
const request = ({ url, time }) => {
  function doRequest() {
    return fetch(url, time)
      .then((res) => {
        if (Math.random() < 0.5) {
          console.log("token 过期");
          updateState("isLogin", false);
          updateState("isLoginInProgress", false);
          return doRequestWithLogin();
        } else {
          return res;
        }
      })
      .catch((err) => console.warn(err));
  }

  function doRequestWithLogin() {
    return login().then(doRequest);
  }

  function doRequestWithWaitForLogin() {
    return waitForLogin().then(doRequest);
  }

  return getState("isLogin")
    ? doRequest()
    : getState("isLoginInProgress")
    ? doRequestWithWaitForLogin()
    : doRequestWithLogin();
};

// API 任务

const task1 = (params) => {
  return request(params);
};

// 页面加载
const pageOnLoad = async () => {
  task1({
    url: "foo",
    time: 1000,
  }).then((res) => {
    console.log(res);
  });

  task1({
    url: "bar",
    time: 2000,
  }).then((res) => {
    console.log(res);
  });

  task1({
    url: "baz",
    time: 3000,
  }).then((res) => {
    console.log(res);
  });
};

updateState("isLogin", false);
updateState("isLoginInProgress", false);
pageOnLoad();
