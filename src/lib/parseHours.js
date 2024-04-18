export function parseHours (input) {
  let result = 0;
  const hoursMatch = input.match(/(\d+)h/);
  if (hoursMatch) {
    result += parseInt(hoursMatch[1]);
  }
  const daysMatch = input.match(/(\d+)d/);
  if (daysMatch) {
    result += parseInt(daysMatch[1]) * 8;
  }
  return result;
}