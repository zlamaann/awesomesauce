interface Ranges {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };

const ranges:Ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };

export function timeAgo(date: Date) {
    const formatter = new Intl.RelativeTimeFormat('en');
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;
    let key: keyof Ranges;
    for (key in ranges) {
      if (ranges[key] < Math.abs(secondsElapsed)) {
        const delta = secondsElapsed / ranges[key];
        return formatter.format(Math.round(delta), key);
      }
    }
  }