/**
 * Description - module creates previous Sunday date from todays date
 * @export {string} - return's previous Sundays date in MM-DD-YYYY format etc...
 *
 * @importedBy - nba-scores.vue
 */

// ========= Vars ========================== //
/**
 * @Description - Function to create the previous Sunday's date from
 *   the date parameter passed into the function
 * @param {string} - today's date in string form yyyy-mm-dd
 * @returns - The previous Sunday's date in yyyy-mm-dd format
 * @calledby - nfl-scores.vue
 */
export function transformDate(date) {
  const todaysDayOfWeek = date.getDay();
  console.log(todaysDayOfWeek);

  const previousSundaysDate = new Date(
    new Date().setDate(new Date().getDate() - todaysDayOfWeek)
  );
  console.log(previousSundaysDate);
  const previousSundaysDateISOString = previousSundaysDate
    .toISOString()
    .slice(0, 10);

  const previousMondaysDate = new Date(
    new Date().setDate(new Date().getDate() - (todaysDayOfWeek - 1))
  );
  const previousMondaysDateISOString = previousMondaysDate
    .toISOString()
    .slice(0, 10);

  console.log(previousMondaysDateISOString);

  return {
    previousSundaysDate,
    previousSundaysDateISOString,
    previousMondaysDateISOString,
  };
}
