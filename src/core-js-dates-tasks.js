/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return new Date(date).getTime();
}
// 08:20:55 GMT+0300 (Москва, стандартное время)
/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
// function getTime(date) {
//   let sTime = '';
//   let sTimeItem = date.getHours();

//   sTime += sTimeItem < 10 ? `0${sTimeItem}:` : `${sTimeItem}:`;
//   sTimeItem = date.getMinutes();
//   sTime += sTimeItem < 10 ? `0${sTimeItem}:` : `${sTimeItem}:`;
//   sTimeItem = date.getSeconds();
//   sTime += sTimeItem < 10 ? `0${sTimeItem}` : sTimeItem;

//   return sTime;
// }

function getTime(date) {
  return date.toTimeString().slice(0, 8);
}

/**
 * Returns the name of the  bfor a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const aWeekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return aWeekDays[new Date(date).getDay()];
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  let d = 5 - date.getDay();
  if (d <= 0) d += 7;
  d += date.getDate();
  date.setDate(d);
  return date;
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  return 32 - new Date(year, month - 1, 32).getDate();
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const ds = new Date(dateStart);
  const de = new Date(dateEnd);
  return (de - ds) / 86400000 + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const ds = new Date(period.start);
  const de = new Date(period.end);
  const d = new Date(date);
  return d >= ds && d <= de;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  let sDate = `${date[5] === '0' ? date[6] : date.slice(5, 7)}/${date[8] === '0' ? date[9] : date.slice(8, 10)}/${date.slice(0, 4)}, `;
  let hh = '';
  if (Number(date.slice(11, 13)) < 12)
    sDate += `${date[11] === '0' ? date[12] : date.slice(11, 13)}${date.slice(13, 19)} AM`;
  else {
    hh = Number(date.slice(11, 13)) - 12;
    if (hh === 0) hh = 12;
    sDate += `${hh}${date.slice(13, 19)} PM`;
  }
  return sDate;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 * //let qWE = 2 * Math.floor(qd / 7);
 */
function getCountWeekendsInMonth(month, year) {
  const qd = 32 - new Date(year, month - 1, 32).getDate();
  const dW1 = new Date(year, month - 1, 1).getDay();

  let qWE = 8;
  if (dW1 === 5 && qd === 30) qWE = 9;
  if (dW1 === 0 && qd >= 29) qWE = 9;
  if (dW1 === 4 && qd === 31) qWE = 9;
  if (dW1 === 5 && qd === 31) qWE = 10;
  if (dW1 === 6 && qd >= 30) qWE = 10;
  return qWE;
}

/**
 * Returns the week number of the year for a given date.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const dd = new Date(date.valueOf());
  const dW = (date.getDay() + 6) % 7;
  dd.setDate(dd.getDate() - dW + 3);

  const d1 = new Date(date.getFullYear(), 0, 1);
  const dW1 = d1.getDay();

  if (d1.getDay() !== 4) {
    d1.setMonth(0, 1 + ((4 - d1.getDay() + 7) % 7));
  }

  let qd = 1 + Math.ceil((dd - d1) / 604800000);

  if (dW1 > 4 || dW1 === 0) qd += 1;
  return qd;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  let date13 = date;
  let dMonth = date.getMonth();
  let dYear = date.getFullYear();

  if (date.getDate() >= 13) {
    dMonth += 1;
    if (dMonth > 11) {
      dMonth = 0;
      dYear += 1;
    }
  }

  date13 = new Date(date.getFullYear(dYear), dMonth, 13);
  while (date13.getDay() !== 5) {
    dMonth += 1;
    if (dMonth > 11) {
      dMonth = 0;
      dYear += 1;
    }
    date13 = new Date(date.getFullYear(dYear), dMonth, 13);
  }

  return date13;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  return Math.floor(date.getMonth() / 3) + 1;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const aDates = [];

  const cD = new Date(
    Number(period.start.slice(6)),
    Number(period.start.slice(3, 5)) - 1,
    Number(period.start.slice(0, 2))
  );

  const lD = new Date(
    Number(period.end.slice(6)),
    Number(period.end.slice(3, 5)) - 1,
    Number(period.end.slice(0, 2))
  );

  let sD = '';

  while (cD <= lD) {
    for (let i = 0; i < countWorkDays && cD <= lD; i += 1) {
      sD = `${cD.getDate()}-${cD.getMonth() + 1}-${cD.getFullYear()}`;
      if (cD.getDate() < 10) sD = `0${sD}`;
      if (cD.getMonth() < 9) sD = `${sD.slice(0, 3)}0${sD.slice(3)}`;
      aDates.push(sD);
      cD.setDate(cD.getDate() + 1);
    }
    cD.setDate(cD.getDate() + countOffDays);
  }

  return aDates;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const nYear = date.getFullYear();
  if (nYear % 400 === 0) return true;
  if (nYear % 4 === 0 && nYear % 100 !== 0) return true;
  return false;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
