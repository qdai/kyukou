import { logNames, siteUrl } from '../../utils/constant';
import fetch from 'isomorphic-fetch';

const requestLogs = () => {
  const fetchLog = logName =>
    fetch(`${siteUrl}/api/1/logs/${logName}.json`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(result => Promise.reject(new Error(result.error.message)));
      });
  return Promise.all(logNames.map(fetchLog));
};

export default requestLogs;
