import { validateFirstArg as validate } from '../validate';
import {
  getWeekday,

  floorSecond,
  floorMinute,
  floorHour,
  floorDay,
  floorMonth,
  floorYear,

  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
} from '../index';

export const ceilSecond = validate((isoString) =>
  floorSecond(addSeconds(1, isoString)));

export const ceilMinute = validate((isoString) =>
  floorMinute(addMinutes(1, isoString)));

export const ceilHour = validate((isoString) =>
  floorHour(addHours(1, isoString)));

export const ceilDay = validate((isoString) =>
  floorDay(addDays(1, isoString)));

export const ceilWeek = validate((isoString) =>
  floorDay(addDays(7 - getWeekday(isoString) + 1, isoString)));

export const ceilMonth = validate((isoString) =>
  floorMonth(addMonths(1, isoString)));

export const ceilYear = validate((isoString) =>
  floorYear(addYears(1, isoString)));
