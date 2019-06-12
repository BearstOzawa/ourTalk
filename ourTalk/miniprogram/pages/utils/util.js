function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const typeC = (o) => {
  var str = Object.prototype.toString.call(o);
  return str.match(/\[object (.*?)\]/)[1].toLowerCase();
}

module.exports = {
  formatTime: formatTime,
    typeC: typeC
}