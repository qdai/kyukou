import fetch from 'isomorphic-fetch';
import { siteUrl } from '../../utils/constant';

const requestApi = async (method, formData) => {
  const body = [...formData.entries()].reduce((obj, [key, value]) => ({
    ...obj,
    [key]: value
  }), {});
  const res = await fetch(`${siteUrl}/admin/events/${method}`, {
    body: JSON.stringify(body),
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  });
  return res.json();
};

export default requestApi;
