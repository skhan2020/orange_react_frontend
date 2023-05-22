import React from 'react'

export default function Duration({ className, seconds }: {
    className: string;
    seconds: number;
}): React.JSX.Element {
  return (
    <time dateTime={`P${Math.round(seconds)}S`} className={className}>
      {format(seconds)}
    </time>
  )
}

function format (seconds: number) {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}

function pad (str: number) {
  return ('0' + str).slice(-2)
}