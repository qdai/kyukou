import fetch from 'isomorphic-fetch';
import { siteUrl } from './constant';

const requestEvents = () => fetch(`${siteUrl}/api/1/events/list.json`)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(result => Promise.reject(new Error(result.error.message)));
  });

export default requestEvents;
