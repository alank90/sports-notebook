/**
 * Description - module creates today's &  yesterday's date as an ISO string
 * @param (none)
 * @export {string} - return's both today & yesterday's ISO and locale strings in
 *                    MM-DD-YYYY format etc...
 *
 * @importedBy - nba-scores.vue, nfl-scores.vue, mlb-scores.vue
 */

const today = new Date();
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const todayISOString = today.toISOString().slice(0, 10);
const yesterdayISOString = yesterday.toISOString().slice(0, 10);
const todayLocaleString = today.toLocaleDateString(undefined, options);
const yesterdayLocaleString = yesterday.toLocaleDateString(undefined, options);

export {
  todayISOString,
  yesterdayISOString,
  todayLocaleString,
  yesterdayLocaleString,
  today,
};
