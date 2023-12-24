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
 * @returns - The previous week's date's for S,M,T,Sa in yyyy-mm-dd format
 * @calledby - nfl-scores.vue
 */
export function getPreviousWeeksDates(date) {
  const todaysDayOfWeek = date.getDay();
  let previousMondaysDate, previousThursdaysDate, previousSaturdaysDate;
  const thursdayNumericalValue = 4;
  const saturdaysNumericalvalue = 6;

  const previousSundaysDate = new Date(
    new Date().setDate(new Date().getDate() - todaysDayOfWeek)
  );

  const previousSundaysDateISOString = previousSundaysDate
    .toISOString()
    .slice(0, 10);

  console.log("previouusSunday", previousSundaysDateISOString);

  // Find the previous Monday's date for MNF...
  if (todaysDayOfWeek === 0) {
    // Today is Sunday
    previousMondaysDate = new Date(
      new Date().setDate(new Date().getDate() - 6)
    );
  } else if (todaysDayOfWeek === 1) {
    // Today is Monday
    previousMondaysDate = new Date(
      new Date().setDate(new Date().getDate() - 7)
    );
  } else {
    // Any other day of week
    previousMondaysDate = new Date(
      new Date().setDate(new Date().getDate() - (todaysDayOfWeek - 1))
    );
  }

  const previousMondaysDateISOString = previousMondaysDate
    .toISOString()
    .slice(0, 10);

  console.log("previousMonday", previousMondaysDateISOString);

  // Find the previous Thursday's date for TNF...
  if (todaysDayOfWeek === thursdayNumericalValue) {
    previousThursdaysDate = new Date(
      new Date().setDate(new Date().getDate() - 7)
    );
  } else if (todaysDayOfWeek < thursdayNumericalValue) {
    previousThursdaysDate = new Date(
      new Date().setDate(
        new Date().getDate() - (thursdayNumericalValue + (todaysDayOfWeek - 1))
      )
    );
  } else if (todaysDayOfWeek > thursdayNumericalValue) {
    previousThursdaysDate = new Date(
      new Date().setDate(
        new Date().getDate() - (todaysDayOfWeek - thursdayNumericalValue)
      )
    );
  }

  const previousThursdaysDateISOString = previousThursdaysDate
    .toISOString()
    .slice(0, 10);

  console.log("previousThursday", previousThursdaysDateISOString);

  // Find the previous Saturday's date ...
  if (todaysDayOfWeek === saturdaysNumericalvalue) {
    previousSaturdaysDate = new Date(
      new Date().setDate(new Date().getDate() - 7)
    );
  } else {
    previousSaturdaysDate = new Date(
      new Date().setDate(new Date().getDate() - (todaysDayOfWeek + 1))
    );
  }

  const previousSaturdaysDateISOString = previousSaturdaysDate
    .toISOString()
    .slice(0, 10);

  console.log("previousSatursday", previousSaturdaysDateISOString);
  return {
    previousSundaysDate,
    previousSundaysDateISOString,
    previousMondaysDateISOString,
    previousThursdaysDateISOString,
    previousSaturdaysDateISOString,
  };
}
