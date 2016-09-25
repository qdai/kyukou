import fetch from 'isomorphic-fetch';
import { siteUrl } from '../../utils/constant';

const post = (method, obj) => fetch(`${siteUrl}/admin/events/${method}`, {
  body: JSON.stringify(obj),
  credentials: 'same-origin',
  headers: { 'Content-Type': 'application/json' },
  method: 'POST'
}).then(res => res.json()).then(result => {
  if (result.error) {
    return {
      message: `Error: ${result.error.message}`,
      type: 'danger'
    };
  }
  return {
    message: `Success: ${result.success.message}`,
    type: 'success'
  };
});

export default post;
