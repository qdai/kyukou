const formatLog = log => ({
  ...log,
  time: new Date(log.time).toString(),
  level: [
    '',
    'success',
    'info',
    'warning',
    'danger'
  ][log.level]
});

export default formatLog;
