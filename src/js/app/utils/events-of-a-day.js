const formatEvents = data => {
  const eventsObj = {};
  data.forEach(event => {
    // push to eventsObj
    const time = event.eventDate;
    if (!eventsObj[time]) {
      eventsObj[time] = [];
    }
    eventsObj[time].push(event);
  });
  const events = Object.keys(eventsObj).sort().map(key => ({
    data: eventsObj[key],
    date: eventsObj[key][0].dateformatted
  }));
  return events;
};

export default formatEvents;
