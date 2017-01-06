const eventsOfADay = events => {
  const uniqEventDates = events
    .map(event => event.eventDate)
    .filter((event, index, eventDates) => eventDates.lastIndexOf(event) === index)
    .sort();
  return uniqEventDates.map(eventDate => {
    const data = events.filter(event => eventDate === event.eventDate);
    return {
      data,
      date: data[0].date,
      dateFormatted: data[0].dateFormatted
    };
  });
};

export default eventsOfADay;
