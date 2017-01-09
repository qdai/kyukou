import fetch from 'isomorphic-fetch';
import { siteUrl } from './constant';

const requestEvents = () =>
  fetch(`${siteUrl}/api/1/events/list.json`)
    .then(res => res.json());

export default requestEvents;
