export interface ClockTime {
  h: number
  m: number
  s: number
}

export function zonedTime(date: Date, timeZone: string): ClockTime {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date)
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0)
  return { h: get('hour') % 24, m: get('minute'), s: get('second') }
}

export function formatHHMM(t: ClockTime): string {
  return `${String(t.h).padStart(2, '0')}:${String(t.m).padStart(2, '0')}`
}
