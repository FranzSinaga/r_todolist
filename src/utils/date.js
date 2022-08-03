// https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
export const getDateTimeNow = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var time = today.toLocaleTimeString();
  
  today = dd + '/' + mm + '/' + yyyy + ' ' + time;
  return today;
}

export const selectorByDate = (date) => {
  const delSpace = date.replace(/\s/g, '');
  const split = delSpace.split('/');
  const result1 = split.join('');

  const split2 = result1.split(':');
  const result2 = split2.join('')
  return result2
}