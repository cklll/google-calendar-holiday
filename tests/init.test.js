const GoolgeCalendarHoliday = require('..').default;

describe('init', () => {
  describe('when API key is invalid', () => {
    it('should throw error', async () => {
      const calendar = new GoolgeCalendarHoliday(
        '123',
        {
          hkHoliday: 'zh-tw.hong_kong%23holiday%40group.v.calendar.google.com',
        },
      );
      await expect(calendar.init()).rejects.toThrow();
    });
  });

  describe('when API key valid', () => {
    it('should not throw error', async () => {
      const calendar = new GoolgeCalendarHoliday(
        process.env.API_KEY,
        {
          hkHoliday: 'zh-tw.hong_kong%23holiday%40group.v.calendar.google.com',
        },
      );
      await expect(calendar.init()).resolves.not.toThrow();
    });
  });
});
