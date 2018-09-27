![travis-ci](https://travis-ci.org/cklll/google-calendar-holiday.svg?branch=master)

## Google Calendar Helper

This package make use of Google Calendar API to provide the following functions:

* List your events by date ranges

## Example usages

* Check whether a date is public holiday

## Installation
```js
npm instal --save google-calendar-help
```

## Set up your credentials and Google Calendar

Enable Google Calendar API
https://developers.google.com/calendar/quickstart/nodejs

Create an API key


## Examples

#### Init
```js
const GoolgeCalendarHoliday = require('google-calendar-holiday');
const holiday = new GoolgeCalendarHoliday(
  'API_KEY',
  {
    hkHoliday: 'zh-tw.hong_kong%23holiday%40group.v.calendar.google.com',
    usHoliday: 'en.usa%23holiday%40group.v.calendar.google.com',
  },
);
// this will try to make an API call to test if the API key is valid
await holiday.init();
```

#### Check whether a date is holiday
```js
holiday.isHoliday('2018-10-17') // true
holiday.isHoliday('2018-11-22') // true

// specify calendars
holiday.isHoliday('2018-10-17', ['hkHoliday']) // true
holiday.isHoliday('2018-11-22', ['hkHoliday']) // false
```

#### Get holiday names of a date
```js
holiday.getHolidayNames('2018-10-17') // ['重陽節']
holiday.getHolidayNames('2018-11-22') // ['Thanksgiving Day']
holiday.getHolidayNames('2018-01-01') // ['元旦', 'New Year's Day']

// specify calendars
holiday.getHolidayNames('2018-10-17', ['hkHoliday']) // ['重陽節']
holiday.getHolidayNames('2018-11-22', ['hkHoliday']) // ['']
```