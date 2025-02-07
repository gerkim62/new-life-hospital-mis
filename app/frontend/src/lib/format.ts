// kenyan time date format
const dateTimeFormatter = new Intl.DateTimeFormat("en-KE", {
  year: "numeric",
  month: "short", // 'Feb' instead of 'February'
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true, // 12-hour format
  timeZone: "Africa/Nairobi",
});
const shortDateFormatter = new Intl.DateTimeFormat("en-KE", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function formatDateTime(date: Date): string {
  date = new Date(date);
  console.log("formatDateTime -> date", date);
  return dateTimeFormatter.format(date);
}

function formatTime(date: Date) {
  date = new Date(date);

  return shortDateFormatter.format(date);
}

export { formatDateTime, formatTime };
