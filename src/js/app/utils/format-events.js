import 'moment/locale/ja';
import moment from 'moment';

moment.updateLocale('ja', {
  calendar: {
    lastDay: '[昨日]',
    lastWeek: 'YYYY年M月D日（dd）',
    nextDay: '[明日]',
    nextWeek: 'dddd',
    sameDay: '[今日]',
    sameElse: 'YYYY年M月D日（dd）'
  }
});

const formatEvents = events => events.map(event => {
  event.raw = event.raw.replace(/\s+/g, ' ');
  // Datetime
  const eventDate = moment(event.eventDate).utcOffset(540);
  event.eventDate = eventDate.valueOf();
  event.dateformatted = eventDate.calendar();
  return event;
});

export default formatEvents;
