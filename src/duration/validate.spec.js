import { assertThat, equalTo } from 'hamjest';
import { isValid } from './validate';

describe('isValid iso8601 duration', () => {
  [
    { isoDuration: 'P1y', valid: true },
    { isoDuration: 'P1Y', valid: true },
    { isoDuration: 'P1.5Y', valid: true },
    { isoDuration: 'P11Y', valid: true },
    { isoDuration: 'P11Y1W', valid: true },
    { isoDuration: 'P1M', valid: true },
    { isoDuration: 'P1.5M', valid: true },
    { isoDuration: 'P11M', valid: true },
    { isoDuration: 'P1W', valid: true },
    { isoDuration: 'P1.5W', valid: true },
    { isoDuration: 'P1D', valid: true },
    { isoDuration: 'P1.5D', valid: true },
    { isoDuration: 'P11D', valid: true },
    { isoDuration: 'P1Y11D', valid: true },
    { isoDuration: 'PT1H', valid: true },
    { isoDuration: 'PT1M', valid: true },
    { isoDuration: 'P3Y6M1W4DT12H30M17.5S', valid: true },

    { isoDuration: 'PT-1S', valid: true },
    { isoDuration: 'PT+1S', valid: true },

    { isoDuration: 'P1H', valid: false },
    { isoDuration: 'P1S', valid: false },
    { isoDuration: 'P1Y11D1M', valid: false },
    { isoDuration: 'P11D1Y', valid: false },
    { isoDuration: '', valid: false },
    { isoDuration: 'Invalid Data', valid: false },
    { isoDuration: '2xxx', valid: false },
    { isoDuration: '2000-123', valid: false },
    { isoDuration: '2000-12-124', valid: false },
  ].forEach(({ isoDuration, valid }) => {
    it(`"${isoDuration}" is ${valid ? 'valid' : 'invalid'}`, () => assertThat(
      isValid(isoDuration), equalTo(valid)));
  });
});

