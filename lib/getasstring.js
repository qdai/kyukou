'use strict';

const moment = require('moment');

moment.locale('ja');

const GetString = class {
  constructor (event) {
    this.about = event.about;
    this.datetime = moment(event.eventDate).format('M月D日（dd）');
    this.department = event.department;
    this.period = event.period;
    this.subject = '「' + event.subject + (event.campus ? '（' + event.campus + '）' : '') + '」' + (event.teacher ? '（' + event.teacher + '教員）' : '');
    this.room = event.room;
    this.note = event.note;
  }
  asRSSTitle () {
    return '【' + this.about + '】' + this.datetime +
      this.department + this.subject;
  }
  asRSSDescription () {
    return '【' + this.about + '】' + this.datetime + this.department + this.period + '時限' + this.subject + (this.room ? '；教室：' + this.room : '') + (this.note ? '；備考：' + this.note : '');
  }
  asCalSummary () {
    return '【' + this.about + '】' + this.period + '時限' + '\n' +
      this.subject + '\n';
  }
  asCalDescription () {
    return '【' + this.about + '】' + this.period + '時限' + '\n' +
      this.subject + '\n' +
      (this.room ? '教室：' + this.room + '\n' : '') +
      (this.note ? '備考：' + this.note + '\n' : '');
  }
};

module.exports = event => {
  return new GetString(event);
};
