import { readFileSync } from 'fs';

const TZ_MONTHS = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

const readLeapSeconds = (fileContents) => {
  return fileContents.split('\n')
    .filter((line) => line.startsWith('Leap'))
    .map((line) => line.split('\t'))
    .reduce((previous, [ type, year, month, day, time, correction ]) => {
      return {
        ...previous,
        [`${year}-${TZ_MONTHS[month]}-${day}`]: {
          correction: correction === '+' ? 1 : -1,
          time: time
        }
      };
    }, {});
};

import { assertThat, equalTo } from 'hamjest';
describe('readLeapSeconds', () => {
  it('removes all comments', () => {
    const tzLeapSeconds = readFileSync('./scripts/_test-fixtures/leapseconds', 'utf8');
    const leapSecondsAsJson = readLeapSeconds(tzLeapSeconds);

    assertThat(leapSecondsAsJson['1972-06-30'], equalTo({ correction: 1, time: '23:59:60' }));
  });
});

