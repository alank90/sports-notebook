const date = new Date();

/* eslint-disable-next-line no-unused-vars */
const [month, day, year, yesterday] = [
  date.getMonth(),
  date.getDate(),
  date.getFullYear(),
  date.getDate() - 1,
];

const currentDate = `${year}-${month + 1}-${yesterday}`;

console.log(currentDate);
export { currentDate, yesterday };
