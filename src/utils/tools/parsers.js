export const parseSexFromIndex = (index) => {
  const options = ['Male', 'Female'];

  return options[index];
};

export const parseCustomDateString = (date) => {
  const dateString = date.toDateString().split(' ');

  dateString.shift();

  const [month, day, year] = dateString;

  return `${month} ${day}, ${year}`;
};

export const parseAgeFromDateString = (dateString) => {
  const now = Date.now();
  const then = new Date(dateString).getTime();

  const timeDelta = now - then;
  const ageDelta = new Date(timeDelta);

  return Math.abs(ageDelta.getUTCFullYear() - 1970);
};

export const parseQTcFra = (QT, HR) =>
  Math.ceil(QT + 154 * (1 - 6000 / HR / 100));
