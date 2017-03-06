import 'moment/locale/ja'; // eslint-disable-line import/no-unassigned-import
import moment from 'moment';

moment.calendarFormat = (myMoment, now) => {
  const daysDiff = myMoment.diff(now, 'days', true);
  const weeksDiff = myMoment.diff(now.clone().startOf('week'), 'weeks', true);
  if (daysDiff < -1) {
    if (weeksDiff < -1) {
      return 'sameElse';
    } else if (weeksDiff < 0) {
      return 'lastWeek';
    }
    return 'thisWeek';
  } else if (daysDiff < 0) {
    return 'lastDay';
  } else if (daysDiff < 1) {
    return 'sameDay';
  } else if (daysDiff < 2) {
    return 'nextDay';
  } else if (weeksDiff < 1) {
    return 'thisWeek';
  } else if (weeksDiff < 2) {
    return 'nextWeek';
  }
  return 'sameElse';
};

moment.updateLocale('ja', {
  calendar: {
    lastDay: '[昨日]',
    lastWeek: '先週dddd',
    nextDay: '[明日]',
    nextWeek: '来週dddd',
    sameDay: '[今日]',
    sameElse: 'M月D日（dd）',
    thisWeek: '今週dddd'
  }
});

const formatEvent = event => {
  const eventDate = moment(event.eventDate).utcOffset(540);
  event.date = eventDate.format('LL');
  event.dateFormatted = eventDate.calendar();
  event.raw = event.raw.replace(/\s+/g, ' ');
  return event;
};

export default formatEvent;
