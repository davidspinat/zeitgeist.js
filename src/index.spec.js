import { assertThat, equalTo } from 'hamjest';

const containsChar = (isoString, s) => isoString.indexOf(s) !== -1;

const DATE_UNIT_SEPARATOR = '-';
const TIME_UNIT_SEPARATOR = ':';

const TIME_COMPONENT_SEPARATOR_1 = 'T';
const TIME_COMPONENT_SEPARATOR_2 = ' ';

const parseDateUnit = (value) => value ? parseInt(value, 10) : 1;
const parseTimeUnit = (value) => value ? parseFloat(value) : 0;

const findTimeSeperator = (isoString) => {
  if(containsChar(isoString, TIME_COMPONENT_SEPARATOR_1)) { return TIME_COMPONENT_SEPARATOR_1; }
  return TIME_COMPONENT_SEPARATOR_2;
};

const separateDateAndTimeComponents = (isoString) => {
  const timeSeparator = findTimeSeperator(isoString);
  const [dateComponent, timeComponent = ''] = isoString.split(timeSeparator);
  return { dateComponent, timeComponent };
};

const parseIso = (isoString) => {
  const { dateComponent, timeComponent } = separateDateAndTimeComponents(isoString);
  const [year, month, day] = dateComponent.split(DATE_UNIT_SEPARATOR);
  const [hour, minute, second] = timeComponent.split(TIME_UNIT_SEPARATOR);

  return {
    year: parseInt(year),
    month: parseDateUnit(month),
    day: parseDateUnit(day),
    hour: parseTimeUnit(hour),
    minute: parseTimeUnit(minute),
    second: parseTimeUnit(second),
  };
};

describe('parseIso', () => {
  describe('`2000` responds', () => {
    it('year 2000', () => assertThat(
      parseIso('2000').year, equalTo(2000)));

    it('month 1', () => assertThat(
      parseIso('2000').month, equalTo(1)));

    it('day 1', () => assertThat(
      parseIso('2000').day, equalTo(1)));

    it('hour 0', () => assertThat(
      parseIso('2000').hour, equalTo(0)));

    it('minute 0', () => assertThat(
      parseIso('2000').minute, equalTo(0)));

    it('second 0', () => assertThat(
      parseIso('2000').second, equalTo(0)));
  });

  describe('`2000-01` responds', () => {
    it('year 2000', () => assertThat(
      parseIso('2000-01').year, equalTo(2000)));

    it('month 1', () => assertThat(
      parseIso('2000-01').month, equalTo(1)));

    it('day 1', () => assertThat(
      parseIso('2000-01').day, equalTo(1)));
  });

  describe('`2000-01-01` responds', () => {
    it('year 2000', () => assertThat(
      parseIso('2000-01-01').year, equalTo(2000)));

    it('month 1', () => assertThat(
      parseIso('2000-01-01').month, equalTo(1)));

    it('day 1', () => assertThat(
      parseIso('2000-01-01').day, equalTo(1)));
  });

  describe('`2000-01-01` responds', () => {
    it('year 2000', () => assertThat(
      parseIso('2000-01-01').year, equalTo(2000)));

    it('month 1', () => assertThat(
      parseIso('2000-01-01').month, equalTo(1)));

    it('day 1', () => assertThat(
      parseIso('2000-01-01').day, equalTo(1)));
  });

  describe('`2000-01-01T10:20:30.123` responds', () => {
    it('`hour is 10`', () => assertThat(
      parseIso('2000-01-01T10:20:30.123').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      parseIso('2000-01-01T10:20:30.123').minute, equalTo(20)));

    it('`second is 0`', () => assertThat(
      parseIso('2000-01-01T10:20:30.123').second, equalTo(30.123)));
  });

  describe('`2000-01-01 10:20` responds', () => {
    it('`hour is 10`', () => assertThat(
      parseIso('2000-01-01 10:20').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      parseIso('2000-01-01 10:20').minute, equalTo(20)));

    it('`second is 0`', () => assertThat(
      parseIso('2000-01-01 10:20').second, equalTo(0)));
  });

  describe('`2000-01-01 10:20` responds', () => {
    it('`hour is 10`', () => assertThat(
      parseIso('2000-01-01 10:20').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      parseIso('2000-01-01 10:20').minute, equalTo(20)));

    it('`second is 0`', () => assertThat(
      parseIso('2000-01-01 10:20').second, equalTo(0)));
  });
});

const isLeapYear = (isoString) => {
  const year = parseIso(isoString).year;
  const dividableBy4 = year % 4 === 0;
  const dividableBy100 = year % 100 === 0;
  const dividableBy400 = year % 400 === 0;

  return (dividableBy4 && !dividableBy100) || dividableBy400;
};

describe('isLeapYear', () => {
  const LEAP_YEARS = [
    2000,
    2016,
  ];

  const REGULAR_YEARS = [
    1582,
    1700,
    1800,
    1900,
    2017,
    2100,
    2200,
    2300,
    2500,
    2600
  ];

  LEAP_YEARS.forEach((year) => {
    it(`${year} is a leap year`, () => assertThat(
      isLeapYear(`${year}`), equalTo(true)));
  });

  REGULAR_YEARS.forEach((year) => {
    it(`${year} is NOT a leap year`, () => assertThat(
      isLeapYear(`${year}`), equalTo(false)));
  });
});

const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 30, 31, 30, 31, 30, 31];
const daysInMonth = (isoString, month) => {
  if(month === 2 && isLeapYear(isoString) ) { return 29; }
  return DAYS_IN_MONTHS[month - 1];
};

describe('daysInMonth', () => {
  describe('in a leap year', () => {
    it('january has 31 days', () => assertThat(
      daysInMonth('2016', 1), equalTo(31)));

    it('february has 29 days', () => assertThat(
      daysInMonth('2016', 2), equalTo(29)));

    it('march has 31 days', () => assertThat(
      daysInMonth('2016', 3), equalTo(31)));

    it('april has 30 days', () => assertThat(
      daysInMonth('2016', 4), equalTo(30)));

    it('may has 31 days', () => assertThat(
      daysInMonth('2016', 5), equalTo(31)));

    it('june has 30 days', () => assertThat(
      daysInMonth('2016', 6), equalTo(30)));

    it('july has 30 days', () => assertThat(
      daysInMonth('2016', 7), equalTo(30)));

    it('august has 31 days', () => assertThat(
      daysInMonth('2016', 8), equalTo(31)));

    it('september has 30 days', () => assertThat(
      daysInMonth('2016', 9), equalTo(30)));

    it('october has 31 days', () => assertThat(
      daysInMonth('2016', 10), equalTo(31)));

    it('november has 30 days', () => assertThat(
      daysInMonth('2016', 11), equalTo(30)));

    it('december has 31 days', () => assertThat(
      daysInMonth('2016', 12), equalTo(31)));
  });

  describe('in a regular year', () => {
    it('january has 31 days', () => assertThat(
      daysInMonth('2017', 1), equalTo(31)));

    it('february has 28 days', () => assertThat(
      daysInMonth('2017', 2), equalTo(28)));

    it('march has 31 days', () => assertThat(
      daysInMonth('2017', 3), equalTo(31)));

    it('april has 30 days', () => assertThat(
      daysInMonth('2017', 4), equalTo(30)));

    it('may has 31 days', () => assertThat(
      daysInMonth('2017', 5), equalTo(31)));

    it('june has 30 days', () => assertThat(
      daysInMonth('2017', 6), equalTo(30)));

    it('july has 30 days', () => assertThat(
      daysInMonth('2017', 7), equalTo(30)));

    it('august has 31 days', () => assertThat(
      daysInMonth('2017', 8), equalTo(31)));

    it('september has 30 days', () => assertThat(
      daysInMonth('2017', 9), equalTo(30)));

    it('october has 31 days', () => assertThat(
      daysInMonth('2017', 10), equalTo(31)));

    it('november has 30 days', () => assertThat(
      daysInMonth('2017', 11), equalTo(30)));

    it('december has 31 days', () => assertThat(
      daysInMonth('2017', 12), equalTo(31)));
  });
});

