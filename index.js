const axios = require('axios');

// eslint-disable-next-line no-underscore-dangle
const _flatArray = array => array.reduce((a, b) => a.concat(b), []);
const getAxios = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    const err = new Error();
    if (error.response.data.error) {
      err.data = error.response.data;
      err.code = error.response.data.error.code;
    } else {
      err.code = 500;
    }
    throw err;
  }
};

class GoolgeCalendarHoliday {
  constructor(
    apiKey,
    calendars = {},
  ) {
    this.calendars = calendars;
    this.calendarNames = Object.keys(this.calendars);
    this.apiKey = apiKey;
    this.isInit = false;
  }

  async init() {
    const queryString = `key=${this.apiKey}`;
    const calendarId = Object.values(this.calendars)[0];
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${queryString}`;
    await getAxios(url);
  }

  async getHolidayBetweenDates(startDateString, endDateString, calendarNamesToCheck) {
    const timeMin = `${startDateString}T00:00:00Z`;
    const timeMax = `${endDateString}T23:59:59Z`;

    let { calendarNames } = this;
    if (calendarNamesToCheck) {
      calendarNames = calendarNamesToCheck
        .filter(calendarName => this.calendarNames.indexOf(calendarName) !== -1);
    }

    const calendarsEvents = await Promise.all(calendarNames.map(async (calendarName) => {
      const calendarId = this.calendars[calendarName];
      const queryString = `key=${this.apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&maxResults=100`;
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${queryString}`;
      const data = await getAxios(url);
      return data.items;
    }));

    return _flatArray(calendarsEvents);
  }

  async getHolidayNames(dateString, calendarNamesToCheck) {
    const holidaysBetweenDates = await this.getHolidayBetweenDates(
      dateString,
      dateString,
      calendarNamesToCheck,
    );
    return holidaysBetweenDates.map(holiday => holiday.summary);
  }

  async isHoliday(dateString, calendarNamesToCheck) {
    const holidays = await this.getHolidayNames(dateString, calendarNamesToCheck);
    return holidays.length > 0;
  }
}

module.exports = GoolgeCalendarHoliday;
