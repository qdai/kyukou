import fetch from 'isomorphic-fetch';
import { siteUrl } from '../../utils/constant';

const requestApi = (method, formData) => {
  const body = [...formData.entries()].reduce((obj, arr) => {
    obj[arr[0]] = arr[1];
    return obj;
  }, {});
  return fetch(`${siteUrl}/admin/events/${method}`, {
    body: JSON.stringify(body),
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  })
    .then(res => res.json());
};

export default requestApi;
