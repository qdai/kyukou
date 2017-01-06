const formatEvent = event => {
  event['tweet.new'] = event.tweet.new.toString();
  event['tweet.tomorrow'] = event.tweet.tomorrow.toString();
  return event;
};

export default formatEvent;
