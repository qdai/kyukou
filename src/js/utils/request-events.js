import fetch from 'isomorphic-fetch';
import { siteUrl } from './constant';

const requestEvents = async () => {
  const res = await fetch(`${siteUrl}/api/1/events/list.json`);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error.message);
  }
  return result;
};

export default requestEvents;
