/* eslint-disable no-console */

const GoolgeCalendarHoliday = require('google-calendar-holiday');

const holiday = new GoolgeCalendarHoliday(
  'API_KEY',
  {
    hkHoliday: 'zh-tw.hong_kong%23holiday%40group.v.calendar.google.com',
    usHoliday: 'en.usa%23holiday%40group.v.calendar.google.com',
  },
);


const main = async () => {
  // this will try to make an API call to test if the API key is valid
  await holiday.init();

  console.log(await holiday.isHoliday('2018-10-17')); // true
  console.log(await holiday.isHoliday('2018-11-22')); // true

  // specify calendars
  console.log(await holiday.isHoliday('2018-10-17', ['hkHoliday']));// true
  console.log(await holiday.isHoliday('2018-11-22', ['hkHoliday'])); // false

  console.log(await holiday.getHolidayNames('2018-10-17')); // ['重陽節']
  console.log(await holiday.getHolidayNames('2018-11-22')); // ['Thanksgiving Day']
  console.log(await holiday.getHolidayNames('2018-01-01')); // ['元旦', 'New Year\'s Day']

  // specify calendars
  console.log(await holiday.getHolidayNames('2018-10-17', ['hkHoliday'])); // ['重陽節']
  console.log(await holiday.getHolidayNames('2018-11-22', ['hkHoliday'])); // []
};

main();
