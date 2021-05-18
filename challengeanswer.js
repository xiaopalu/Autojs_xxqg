var utils = require('./utils')
var start = require('./start')
function challengeanswer () {
  start()//启动app
  utils.delay(1)
  console.log('初始化完毕');
}
exports.challengeanswer = challengeanswer