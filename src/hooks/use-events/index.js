import axios from 'axios';
import formatEvent from './format-event';
import { site } from '../../constant';
import { useQuery } from '@tanstack/react-query';

const fetchEvents = async () => {
  const { data } = await axios.get(`${site.url}/api/1/events/list.json`);
  return data;
};

const useEvents = () => {
  const { error, data, status } = useQuery(['events'], fetchEvents, { refetchOnWindowFocus: false });

  return {
    error,
    events: (data || []).map(formatEvent),
    status
  };
};

export default useEvents;
