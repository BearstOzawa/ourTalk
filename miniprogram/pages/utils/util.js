var formatTime = function formatTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return [ year, month, day ].map(formatNumber).join("/") + " " + [ hour, minute, second ].map(formatNumber).join(":");
};

var formatNumber = function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
};

var testDate = function testDate(dateStr) {
    // date : y-m-d
    var date = new Date();
    dateStr = dateStr.toString();
    var year = date.getFullYear();
    var d = [];
    if (dateStr.length > 0) {
        d = dateStr.split("-");
        if (d[0] >= year) return false;
    }
    return true;
};

var typeC = function typeC(o) {
    var str = Object.prototype.toString.call(o);
    return str.match(/\[object (.*?)\]/)[1].toLowerCase();
};

module.exports = {
    formatTime: formatTime,
    testDate: testDate,
    typeC: typeC
};