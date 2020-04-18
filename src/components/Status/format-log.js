const formatLog = log => ({
  ...log,
  level: [
    '',
    'success',
    'info',
    'warning',
    'error'
  ][log.level],
  time: new Date(log.time).toString()
});

export default formatLog;
