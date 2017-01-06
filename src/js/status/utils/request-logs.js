import { logNames, siteUrl } from '../../utils/constant';
import fetch from 'isomorphic-fetch';

const requestLogs = () =>
  Promise.all(logNames.map(logName =>
    fetch(`${siteUrl}/api/1/logs/${logName}.json`)
      .then(res => res.json())
  ));

export default requestLogs;
