//-- IMPORTS
var moment = require('moment'); //-- Using to add more dynamic date-time in view

const format_date = date => {
  //-- Provide a date-time, and get a fully-formatted month / daty / year response

  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`; 
};


const get_TimePassed = ( date ) => {
  //-- Provide a date/time and get duration since that date-time as a result in formatted str.

  
  //-- Get curent time
  var now = moment(new Date()); 
  //-- Get the diff between now and created date
  var duration = moment.duration(now.diff(date));
  //-- Return value in hours
  var results = duration.asHours();
  
  if(results < 1){ minutes = (Math.trunc(results)) + " minutes ago"; return minutes; }
  if(results < 24){ hours = (Math.trunc(results)) + " hours ago"; return hours; }
  if(results > 24){ days = Math.trunc(results / 24) + " d"; return days; }
  
  //-- If for some reason gets to this point, return nothing. ( shouldn't happen but being safe )
  return null;
};

//-- shrinks to 250 characters
const shrinkContent = content => {
  //-- if greater than 250 characters, shrink it.
  if (content.length > 250) return content.substring(0,250) + '...';
  //-- Otherwise return as is
  return content;
}

//-- EXPORTS
module.exports = {
  format_date,
  get_TimePassed,
  shrinkContent
}
