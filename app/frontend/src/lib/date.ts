function getAge(dateOfBirth: Date, currentDate: Date): number {
  const birthDate = new Date(dateOfBirth);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

function getDateOfBirth(age: number, currentDate: Date) {
  const date = new Date(currentDate);
  date.setFullYear(date.getFullYear() - age);
  return date;
}

const calculateDays = (start: Date, end: Date) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  //why using .valueOf()? see: https://stackoverflow.com/a/60688789
  const firstDate = new Date(end).valueOf();
  const secondDate = new Date(start).valueOf();

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

  return diffDays;
};

export { getAge, getDateOfBirth, calculateDays };
