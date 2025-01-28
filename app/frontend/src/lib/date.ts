function getAge(dateOfBirth: Date, currentDate: Date) {
  const diff = currentDate.getTime() - dateOfBirth.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getDateOfBirth(age: number) {
  const date = new Date();
  date.setFullYear(date.getFullYear() - age);
  return date;
}

export { getAge, getDateOfBirth };
