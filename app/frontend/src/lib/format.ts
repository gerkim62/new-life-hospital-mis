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

const timeFormatter = new Intl.DateTimeFormat("en-KE", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Africa/Nairobi",
});



const dateFormatter = new Intl.DateTimeFormat("en-KE", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
});

function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

function formatDateTime(date: Date): string {
  date = new Date(date);
  console.log("formatDateTime -> date", date);
  return dateTimeFormatter.format(date);
}

function formatTime(date: Date) {
  date = new Date(date);

  return timeFormatter.format(date);
}

function formatDate(date: Date) {
  date = new Date(date);

  return dateFormatter.format(date);
}

export { formatDateTime, formatTime, formatCurrency, formatDate };
