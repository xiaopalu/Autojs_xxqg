
var utils = require('./utils')
/**
 * 启动app,初始化
 */
function start () {
  console.log('请等待6秒时间...');
  utils.delay(6)
  var num = device.width//获取屏幕的宽度
  utils.delay(1)
  console.log(num);
  click('我的')
  utils.delay(2)
  click('学习积分')
  utils.delay(5)
  back()
  utils.delay(2)
  back()
}
module.exports = start;