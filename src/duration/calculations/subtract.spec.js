import { assertThat, equalTo } from 'hamjest';
import { INVALID_DURATION } from '../constants';
import {
  subtractMilliseconds,
  subtractMicroseconds,
  subtractSeconds,
  subtractMinutes,
  subtractHours,
  subtractDays,
  subtractWeeks,
  subtractMonths,
  subtractYears,
} from '../index';

describe('calculations', () => {
  describe('subtract', () => {
    describe('microsecond', () => {
      it('adding 1 microsecond from PT0S results in PT-0.000001S', () => assertThat(
        subtractMicroseconds(1, 'PT0S'), equalTo('PT-0.000001S')));

      it('can be curried', () => assertThat(
        subtractMicroseconds(1)('PT0S'), equalTo('PT-0.000001S')));

      it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
        subtractMicroseconds(1)('I\'m invalid'), equalTo(INVALID_DURATION)));
    });

    describe('milliseconds', () => {
      it('subtracting 1 millisecond from PT0S results in PT-0.001S', () => assertThat(
        subtractMilliseconds(1, 'PT0S'), equalTo('PT-0.001S')));

      it('can be curried', () => assertThat(
        subtractMilliseconds(1)('PT0S'), equalTo('PT-0.001S')));

      it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
        subtractMilliseconds(1)('I\'m invalid'), equalTo(INVALID_DURATION)));
    });

    describe('seconds', () => {
      it('subtracting 1 second from PT0S results in PT-1S', () => assertThat(
        subtractSeconds(1, 'PT0S'), equalTo('PT-1S')));

      it('subtracting 61 second from PT0S results in PT-61S', () => assertThat(
        subtractSeconds(61, 'PT0S'), equalTo('PT-61S')));

      it('can be curried', () => assertThat(
        subtractSeconds(61)('PT0S'), equalTo('PT-61S')));

      it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
        subtractSeconds(1)('I\'m invalid'), equalTo(INVALID_DURATION)));
    });

    describe('minutes', () => {
      it('subtracting 1 minute from PT0M results in PT-1M', () => assertThat(
        subtractMinutes(1, 'PT0M'), equalTo('PT-1M')));

      it('can be curried', () => assertThat(
        subtractMinutes(1)('PT0M'), equalTo('PT-1M')));

      it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
        subtractMinutes(1)('I\'m invalid'), equalTo(INVALID_DURATION)));
    });

    describe('hours', () => {
      it('subtracting 1 minute from PT0H results in PT-1H', () => assertThat(
        subtractHours(1, 'PT0H'), equalTo('PT-1H')));

      it('can be curried', () => assertThat(
        subtractHours(1)('PT0H'), equalTo('PT-1H')));

      it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
        subtractHours(1)('I\'m invalid'), equalTo(INVALID_DURATION)));
    });

    describe('days', () => {
      it('subtracting 1 day from P0D results in P-1D', () => assertThat(
        subtractDays(1, 'P0D'), equalTo('P-1D')));

      it('can be curried', () => assertThat(
        subtractDays(1)('P0D'), equalTo('P-1D')));

      it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
        subtractDays(1)('I\'m invalid'), equalTo(INVALID_DURATION)));
    });

    describe('weeks', () => {
      it('subtracting 1 week from P0W results in P-1W', () => assertThat(
        subtractWeeks(1, 'P0W'), equalTo('P-1W')));

      it('can be curried', () => assertThat(
        subtractWeeks(1)('P0W'), equalTo('P-1W')));

      it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
        subtractWeeks(1)('I\'m invalid'), equalTo(INVALID_DURATION)));
    });

    describe('months', () => {
      it('subtracting 1 month from P0M results in P-1M', () => assertThat(
        subtractMonths(1, 'P0M'), equalTo('P-1M')));

      it('can be curried', () => assertThat(
        subtractMonths(1)('P0M'), equalTo('P-1M')));

      it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
        subtractMonths(1)('I\'m invalid'), equalTo(INVALID_DURATION)));
    });

    describe('years', () => {
      it('subtracting 1 year from P0Y results in P-1Y', () => assertThat(
        subtractYears(1, 'P0Y'), equalTo('P-1Y')));

      it('can be curried', () => assertThat(
        subtractYears(1)('P0Y'), equalTo('P-1Y')));

      it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
        subtractYears(1)('I\'m invalid'), equalTo(INVALID_DURATION)));
    });
  });
});
