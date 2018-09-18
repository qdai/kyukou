import { logNames, siteUrl } from '../../utils/constant';
import fetch from 'isomorphic-fetch';

const fetchLog = async logName => {
  const res = await fetch(`${siteUrl}/api/1/logs/${logName}.json`);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error.message);
  }
  return result;
};

const requestLogs = () => Promise.all(logNames.map(fetchLog));

export default requestLogs;
