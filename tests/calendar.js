const GoolgeCalendarHoliday = require('..');

const calendar = new GoolgeCalendarHoliday(
  process.env.API_KEY,
  {
    hkHoliday: 'zh-tw.hong_kong%23holiday%40group.v.calendar.google.com',
    usHoliday: 'en.usa%23holiday%40group.v.calendar.google.com',
  },
);

module.exports = calendar;
