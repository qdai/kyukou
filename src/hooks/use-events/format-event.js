import { format, formatRelative, isSameWeek, parseJSON, startOfToday } from 'date-fns';
import { ja } from 'date-fns/locale';

const formatRelativeLocale = {
  lastWeek (date, baseDate) {
    if (isSameWeek(date, baseDate)) {
      return '今週eeee';
    }
    return '先週eeee';
  },
  nextWeek (date, baseDate) {
    if (isSameWeek(date, baseDate)) {
      return '今週eeee';
    }
    return '来週eeee';
  },
  other: 'PPP（eee）',
  today: '今日',
  tomorrow: '明日',
  yesterday: '昨日'
};

const locale = {
  ...ja,
  formatRelative (token, date, baseDate) {
    const formatLocale = formatRelativeLocale[token];

    if (typeof formatLocale === 'function') {
      return formatLocale(date, baseDate);
    }

    return formatLocale;
  }
};

const formatEvent = event => {
  const eventDate = parseJSON(event.eventDate);
  event.date = format(eventDate, 'PPP', { locale });
  event.dateFormatted = formatRelative(eventDate, startOfToday(), { locale });
  event.raw = event.raw.replace(/\s+/gu, ' ');
  event['tweet.new'] = event.tweet.new.toString();
  event['tweet.tomorrow'] = event.tweet.tomorrow.toString();
  return event;
};

export default formatEvent;
