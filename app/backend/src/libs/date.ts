const calculateDays = (start: Date, end: Date) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  //why using .valueOf()? see: https://stackoverflow.com/a/60688789
  const firstDate = new Date(end).valueOf();
  const secondDate = new Date(start).valueOf();

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

  return diffDays;
};

export { calculateDays };
