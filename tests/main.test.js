const { getLocalTime, formatDate } = require('../src/main');

describe('Utility Functions', () => {
  test('getLocalTime should return the correct local time based on timezone offset', () => {
    const timezoneOffset = 3600; // 1 hour in seconds
    const mockDate = new Date('2025-04-13T12:00:00Z');
    jest.useFakeTimers().setSystemTime(mockDate);

    const localTime = getLocalTime(timezoneOffset);
    expect(localTime).toBe('13:00');

    jest.useRealTimers();
  });

  test('formatDate should return the correct formatted date', () => {
    const mockDate = new Date('2025-04-13T12:00:00Z');
    const formattedDate = formatDate(mockDate);
    expect(formattedDate).toBe('Sunday 13 April 2025');
  });
});