import fetch from 'isomorphic-fetch';

const requestApi = async (method, url, param) => {
  const init = {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    method
  };
  if (param) {
    init.body = JSON.stringify(param);
  }
  const res = await fetch(url, init);
  return res.json();
};

export default requestApi;
