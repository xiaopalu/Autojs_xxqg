
var utils = require('./utils')
var xxqg = getPackageName("学习强国");
/**
 * 启动app,初始化 耗时：6+1+2+4+2 = 15s
 */
function start () {
  if (!(app.launchPackage(xxqg))) {
    console.log('找不到应用');
    return
  }
  while (!id("home_bottom_tab_button_work").exists());//等待加载出主页
  console.log('加载到主页啦啦啦啦');
  utils.delay(2)
  var num = device.width//获取屏幕的宽度
  utils.delay(1)
  console.log('你屏幕的宽度' + num);
  click('我的')
  utils.delay(2)
  click('学习积分')
  utils.delay(4)
  back()
  utils.delay(2)
  back()
}
module.exports = start;