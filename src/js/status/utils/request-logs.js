import { logNames, siteUrl } from '../../utils/constant';
import fetch from 'isomorphic-fetch';

const requestLogs = () => {
  const fetchLog = logName =>
    fetch(`${siteUrl}/api/1/logs/${logName}.json`)
      .then(res => res.json());
  return Promise.all(logNames.map(fetchLog));
};

export default requestLogs;
