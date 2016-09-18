import {
  toFragments,
  toIso,
  floorMinute,
  floorHour,
  floorDay,

  fromJulianDay,
  toJulianDay,
  containsTimeComponent,
  removeTimeComponent,
} from '../index';

import { tco } from '../utils';

// TODO: add leap seconds
const isLastSecondOfMinute = ({ second }) => second === 59;
const isLastSecondOfHour = ({ second, minute }) => second === 59 && minute === 59;
const isLastSecondOfDay = ({ second, minute, hour }) => second === 59 && minute === 59 && hour === 23;
const jumpToNextSecond = (fragments) => ({ ...fragments, second: fragments.second + 1 });
const jumpToNextMinute = (fragments) => ({ ...fragments, minute: fragments.minute + 1 });
const jumpToNextHour = (fragments) => ({ ...fragments, hour: fragments.hour + 1 });
const jumpToNextDay = (fragments) => ({ ...fragments, day: fragments.day + 1 });

export const addSeconds = tco((isoStringOrFragments, seconds) => {
  if (seconds === 0) { return toIso(isoStringOrFragments); }
  const fragments = toFragments(isoStringOrFragments);

  if(isLastSecondOfDay(fragments)) {
    return addSeconds(
      floorDay(
        jumpToNextDay(fragments)), seconds - 1);
  }

  if (isLastSecondOfHour(fragments)) {
    return addSeconds(
      floorHour(
        jumpToNextHour(fragments)), seconds - 1);
  }

  if (isLastSecondOfMinute(fragments)) {
    return addSeconds(
      floorMinute(
        jumpToNextMinute(fragments, 1)), seconds - 1);
  }

  return addSeconds(jumpToNextSecond(fragments), seconds - 1);
});

export const addMinutes = () => {};
export const addHours = () => {};

export const addDays = (isoString, days) => {
  const calculatedIsoString = fromJulianDay(toJulianDay(isoString) + days);

  return containsTimeComponent(isoString)
    ? calculatedIsoString
    : removeTimeComponent(calculatedIsoString);
};

export const addMonths = (isoString, months) => {
  const fragments = toFragments(isoString);
  return toIso({
    ...fragments,
    year: (fragments.year + Math.floor((fragments.month + months - 1) / 12)),
    month: (fragments.month + months + 11) % 12 + 1,
  });
};

export const addYears = (isoStringOrFragments, years) => {
  const fragments = toFragments(isoStringOrFragments);
  return toIso({ ...fragments, year: fragments.year + years });
};
