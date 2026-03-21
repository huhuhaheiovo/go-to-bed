const CYCLE_MINUTES = 90;
const DEFAULT_CYCLE_RANGE = [6, 5, 4];

export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60_000);
}

export function format24(date) {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export function calculateFromWakeTime(wakeTime, onsetMinutes, cycleRange = DEFAULT_CYCLE_RANGE) {
  return cycleRange.map((cycles) => {
    const totalMins = cycles * CYCLE_MINUTES + onsetMinutes;
    const time = addMinutes(wakeTime, -totalMins);
    return { time, cycles, totalSleepMinutes: cycles * CYCLE_MINUTES, mode: 'bedtime' };
  });
}

export function calculateFromBedTime(bedTime, onsetMinutes, cycleRange = DEFAULT_CYCLE_RANGE) {
  const sleepStart = addMinutes(bedTime, onsetMinutes);

  return cycleRange.map((cycles) => {
    const time = addMinutes(sleepStart, cycles * CYCLE_MINUTES);
    return { time, cycles, totalSleepMinutes: cycles * CYCLE_MINUTES, mode: 'wakeup' };
  });
}

export function calculateFromNow(now, onsetMinutes, cycleRange = DEFAULT_CYCLE_RANGE) {
  return cycleRange.map((cycles) => {
    const totalMins = cycles * CYCLE_MINUTES + onsetMinutes;
    const time = addMinutes(now, totalMins);
    return { time, cycles, totalSleepMinutes: cycles * CYCLE_MINUTES, mode: 'wakeup' };
  });
}

export function durationHours(totalSleepMinutes) {
  return totalSleepMinutes / 60;
}
