const calendar = require('./calendar').default;

describe('GoolgeCalendarHoliday', () => {
  const datesOfHkHoliday = ['2018-10-17', '2018-10-01'];
  const datesOfUsHoliday = ['2018-10-8', '2018-10-31'];
  const datesOfHoliday = [...datesOfHkHoliday, ...datesOfUsHoliday];

  const datesOfNotHoldiay = ['2018-11-15', '2018-11-18'];

  describe('isHoliday', () => {
    describe('when calendarName is not provided', () => {
      it('should check all calendar\'s holiday', async () => {
        await Promise.all(datesOfHoliday.map(async (date) => {
          const result = await calendar.isHoliday(date);
          expect(result).toBe(true);
        }));

        await Promise.all(datesOfNotHoldiay.map(async (date) => {
          const result = await calendar.isHoliday(date);
          expect(result).toBe(false);
        }));
      });
    });

    describe('when calendarName is provided', () => {
      it('should check only those calendar\'s holiday', async () => {
        await Promise.all(datesOfUsHoliday.map(async (date) => {
          const result = await calendar.isHoliday(date, ['usHoliday', 'dummy']);
          expect(result).toBe(true);
        }));

        await Promise.all(datesOfUsHoliday.map(async (date) => {
          const result = await calendar.isHoliday(date, ['hkHoliday']);
          expect(result).toBe(false);
        }));

        await Promise.all(datesOfHkHoliday.map(async (date) => {
          const result = await calendar.isHoliday(date, ['hkHoliday']);
          expect(result).toBe(true);
        }));

        await Promise.all(datesOfHkHoliday.map(async (date) => {
          const result = await calendar.isHoliday(date, ['usHoliday']);
          expect(result).toBe(false);
        }));

        await Promise.all(datesOfHkHoliday.map(async (date) => {
          const result = await calendar.isHoliday(date, ['hkHoliday', 'usHoliday']);
          expect(result).toBe(true);
        }));

        await Promise.all(datesOfHoliday.map(async (date) => {
          const result = await calendar.isHoliday(date, []);
          expect(result).toBe(false);
        }));
      });
    });
  });
});
