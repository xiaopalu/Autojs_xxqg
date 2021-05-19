
/**
 * @param {number} 睡眠时间 
 */
function delay (seconds) {
  sleep(1000 * seconds);//sleep函数参数单位为毫秒所以乘1000
}
/**
 * @description: 获取当天日期
 * @param: null
 * @return: s 日期字符串 
 */
function getTodayDateString () {
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth();
  var d = date.getDate();
  var s = dateToString(y, m, d);//年，月，日
  return s
}
function dateToString (y, m, d) {
  var year = y.toString();
  if ((m + 1) < 10) {
    var month = "0" + (m + 1).toString();
  } else {
    var month = (m + 1).toString();
  }
  if (d < 10) {
    var day = "0" + d.toString();
  } else {
    var day = d.toString();
  }
  var s = year + "-" + month + "-" + day;//年-月-日
  return s;
}

function test () {
  console.log('测试');
}
exports.delay = delay;
exports.test = test;
exports.getTodayDateString = getTodayDateString;
