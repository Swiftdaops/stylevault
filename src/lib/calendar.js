export function parseDateTime(dateStr, timeStr) {
  if (!dateStr) return null
  const parts = dateStr.split('-').map(Number)
  if (parts.length < 3) return null
  const year = parts[0]
  const month = (parts[1] || 1) - 1
  const day = parts[2] || 1

  let hours = 9
  let minutes = 0
  if (timeStr) {
    const t = String(timeStr).split(':').map(Number)
    hours = Number.isFinite(t[0]) ? t[0] : 9
    minutes = Number.isFinite(t[1]) ? t[1] : 0
  }

  return new Date(year, month, day, hours, minutes, 0)
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function formatUTCForICS(d) {
  const year = d.getUTCFullYear()
  const month = pad(d.getUTCMonth() + 1)
  const day = pad(d.getUTCDate())
  const hours = pad(d.getUTCHours())
  const minutes = pad(d.getUTCMinutes())
  const seconds = pad(d.getUTCSeconds())
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
}

function escapeICSText(txt) {
  return String(txt || '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

export function buildICS({ uid, title, description, location, startDate, endDate, alarmMinutes = 30 }) {
  const dtstamp = formatUTCForICS(new Date())
  const dtstart = formatUTCForICS(startDate)
  const dtend = formatUTCForICS(endDate)
  const trigger = `-PT${Number(alarmMinutes || 30)}M`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//StyleVault//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${escapeICSText(title)}`,
    `DESCRIPTION:${escapeICSText(description || '')}`,
    `LOCATION:${escapeICSText(location || '')}`,
    'BEGIN:VALARM',
    `TRIGGER:${trigger}`,
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder for ${escapeICSText(title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return lines.join('\r\n')
}

export function downloadICS(icsContent, filename = 'event.ics') {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}

export function buildGoogleCalendarUrl({ title, details, location, start, end }) {
  const format = (d) => {
    // use UTC formatted string
    return formatUTCForICS(d)
  }

  const dates = `${format(start)}/${format(end)}`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title || 'Appointment',
    details: details || '',
    location: location || '',
    dates,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
