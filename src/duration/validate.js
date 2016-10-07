import { TIME_DESIGNATOR, DURATION_DESIGNATOR } from './constants';
import { createRegexBuilder } from '../utils';

const MATCH_NUMBER = /[+-]?\d+(\.\d+)?/.source;
const MATCH_DATE = createRegexBuilder()
  .and(`(${MATCH_NUMBER}Y)?`)
  .and(`(${MATCH_NUMBER}M)?`)
  .and(`(${MATCH_NUMBER}W)?`)
  .and(`(${MATCH_NUMBER}D)?`);

const MATCH_TIME = createRegexBuilder()
  .maybe(createRegexBuilder()
    .and(TIME_DESIGNATOR)
    .and(`(${MATCH_NUMBER}H)?`)
    .and(`(${MATCH_NUMBER}M)?`)
    .and(`(${MATCH_NUMBER}S)?`)
  );

const MATCH_DURATION = createRegexBuilder()
  .startOfLine()
  .and(DURATION_DESIGNATOR)
  .and(MATCH_TIME)
  .and(MATCH_DATE)
  .and(MATCH_TIME)
  .endOfLine();


export const isValid = (isoString) =>
  MATCH_DURATION.test(isoString.toUpperCase());

