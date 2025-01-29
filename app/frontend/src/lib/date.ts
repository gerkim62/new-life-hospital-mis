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

export { getAge, getDateOfBirth };
