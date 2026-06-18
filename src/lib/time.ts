type TimeObject = {
  years: number;
  months: number;
  days: number;
  hours: number;
  min: number;
  secs: number;
};

function getTimeObj(inputVal: number): TimeObject {
  let diff = Date.now() - inputVal;

  const MS = {
    year: 31536000000,
    month: 2592000000,
    day: 86400000,
    hour: 3600000,
    min: 60000,
    sec: 1000,
  };

  const years = Math.floor(diff / MS.year);
  diff %= MS.year;

  const months = Math.floor(diff / MS.month);
  diff %= MS.month;

  const days = Math.floor(diff / MS.day);
  diff %= MS.day;

  const hours = Math.floor(diff / MS.hour);
  diff %= MS.hour;

  const min = Math.floor(diff / MS.min);
  diff %= MS.min;

  const secs = Math.floor(diff / MS.sec);

  return { years, months, days, hours, min, secs };
}

const formatDuration = (d: TimeObject) => {
  if (d.years) return `${d.years} year${d.years > 1 ? "s" : ""}`;
  if (d.months) return `${d.months} month${d.months > 1 ? "s" : ""}`;
  if (d.days) return `${d.days} day${d.days > 1 ? "s" : ""}`;
  if (d.hours) return `${d.hours} hour${d.hours > 1 ? "s" : ""}`;
  if (d.min) return `${d.min} min`;
  return `${d.secs} sec`;
};

export { formatDuration, getTimeObj };
