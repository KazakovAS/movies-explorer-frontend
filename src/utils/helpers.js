function convertingTime(time, format = 'en') {
  const hours = Math.trunc(time/60);
  const minutes = time % 60;
  const hoursUnit = format === 'en' ? 'h' : 'ч';
  const minutesUnit = format === 'en' ? 'm' : 'м';

  return hours > 0
    ? (`${hours}${hoursUnit} ${minutes}${minutesUnit}`)
    : (`${minutes}${minutesUnit}`);
}

export { convertingTime };
