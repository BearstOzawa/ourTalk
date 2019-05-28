const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const testDate = dateStr => {
  // date : y-m-d
  var date = new Date();
  dateStr = dateStr.toString();
  const year = date.getFullYear()
  let d = [];
  if (dateStr.length > 0) {
    d = dateStr.split("-");
    if (d[0] >= year)
      return false;
  }
  return true;
}


const typeC = (o) => {
  var str = Object.prototype.toString.call(o);
  return str.match(/\[object (.*?)\]/)[1].toLowerCase();
}

module.exports = {
  formatTime: formatTime,
  testDate: testDate,
  typeC: typeC
}

