const formatEvents = events => events.map(event => {
  event['tweet.new'] = event.tweet.new.toString();
  event['tweet.tomorrow'] = event.tweet.tomorrow.toString();
  return event;
});

export default formatEvents;
