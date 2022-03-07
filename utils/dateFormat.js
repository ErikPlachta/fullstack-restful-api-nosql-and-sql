const addDateSuffix = date => {
  
  //-- converts incoming date to string
  let dateStr = date.toString();

  // get the character before the last from date which will be day. U
  const lastChar = dateStr.charAt(dateStr.length - 1);

  //-- If-> return statements to determine how to format date suffix based on values
  if (lastChar === '1' && dateStr !== '11') { return `${dateStr}st`;} 
  if (lastChar === '2' && dateStr !== '12') { return `${dateStr}nd`;}  
  if (lastChar === '3' && dateStr !== '13') { return `${dateStr}rd`;}
  return `${dateStr}th`;
};

// function to format a timestamp, accepts the timestamp and an `options` object as optional parameters
module.exports = ( timestamp, { monthLength = 'short', dateSuffix = true } = {} ) => {
    
  //-- Formatting month of year
  let months;
  if (monthLength === 'short') { months = { 0: 'Jan',   1: 'Feb',   2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec' };} 
  else { months = { 0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December' };}

  const dateObj = new Date(timestamp);
  const formattedMonth = months[dateObj.getMonth()];

  //-- Formatting day of week
  let dayOfMonth;

  if (dateSuffix) { dayOfMonth = addDateSuffix(dateObj.getDate()); }
  else { dayOfMonth = dateObj.getDate(); }

  //-- getting year formatted
  const year = dateObj.getFullYear();

  //-- formatting hour
  let hour;
  // check for 24-hr time
  if (dateObj.getHours > 12) { hour = Math.floor(dateObj.getHours() / 2); }
  else { hour = dateObj.getHours(); }
  // if hour is 0 (12:00am), change it to 12
  if (hour === 0) { hour = 12; }
  
  //-- get minutes formatted
  const minutes = dateObj.getMinutes();

  // Formatting time of day as `am` or `pm`
  let periodOfDay;
  if (dateObj.getHours() >= 12) { periodOfDay = 'pm'; }
  else { periodOfDay = 'am'; }

  //-- returning reults
  return `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
};
