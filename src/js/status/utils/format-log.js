const formatLog = log => {
  log.time = new Date(log.time).toString();
  log.level = ['', 'success', 'info', 'warning', 'danger'][log.level];
  return log;
};

export default formatLog;
