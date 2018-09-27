const calendar = require('./calendar').default;

describe('GoolgeCalendarHoliday', () => {
  const datesOfHkHoliday = ['2018-10-17', '2018-10-01'];
  const datesOfUsHoliday = ['2018-10-8', '2018-10-31'];
  const datesOfHoliday = [...datesOfHkHoliday, ...datesOfUsHoliday];

  const datesOfNotHoldiay = ['2018-11-15', '2018-11-18'];

  describe('getHolidayNames', () => {
    describe('when calendarName is not provided', () => {
      it('should check all calendar\'s holiday', async () => {
        await Promise.all(datesOfHoliday.map(async (date) => {
          const result = await calendar.getHolidayNames(date);
          expect(result).toEqual([expect.any(String)]);
        }));

        await Promise.all(datesOfNotHoldiay.map(async (date) => {
          const result = await calendar.getHolidayNames(date);
          expect(result).toHaveLength(0);
        }));
      });
    });

    describe('when calendarName is provided', () => {
      it('should check only those calendar\'s holiday', async () => {
        await Promise.all(datesOfUsHoliday.map(async (date) => {
          const result = await calendar.getHolidayNames(date, ['usHoliday', 'dummy']);
          expect(result).toEqual([expect.any(String)]);
        }));

        await Promise.all(datesOfUsHoliday.map(async (date) => {
          const result = await calendar.getHolidayNames(date, ['hkHoliday']);
          expect(result).toHaveLength(0);
        }));

        await Promise.all(datesOfHkHoliday.map(async (date) => {
          const result = await calendar.getHolidayNames(date, ['hkHoliday']);
          expect(result).toEqual([expect.any(String)]);
        }));

        await Promise.all(datesOfHkHoliday.map(async (date) => {
          const result = await calendar.getHolidayNames(date, ['usHoliday']);
          expect(result).toHaveLength(0);
        }));

        await Promise.all(datesOfHkHoliday.map(async (date) => {
          const result = await calendar.getHolidayNames(date, ['hkHoliday', 'usHoliday']);
          expect(result).toEqual([expect.any(String)]);
        }));

        await Promise.all(datesOfHoliday.map(async (date) => {
          const result = await calendar.getHolidayNames(date, []);
          expect(result).toHaveLength(0);
        }));
      });
    });
  });
});
