var utils = require('./utils')
//电台收听
function radioStudy () {
  while (!id("home_bottom_tab_button_work").exists());//等待加载出主页
  click('电台')
  utils.delay(2)
  click('听广播')
  utils.delay(3)
  click('经济之声')
  utils.delay(2)
  //这里判断是否弹出了播放的按钮，弹出的话需要加入返回的操作
  if (id("v_play").findOnce(0)) {
    console.log('开始收听广播中...');
    back()
  }
  console.log('开始收听广播');
  utils.delay(4)
  desc("工作").click();//点击主页正下方的"学习"按钮
  utils.delay(3)
}
function stopradioStudy () {
  click('电台')
  utils.delay(2)
  click('听广播')
  utils.delay(3)
  click('经济之声')
  utils.delay(2)
  id("v_play").findOnce(0).click();//点击暂停播放按钮
  console.log('暂停广播');
  utils.delay(3)
  back()
}
/**
 * 广播需要收听时间
 * @param {*} r_time -已经收听的时间
 * @param {*} seconds -学习秒数
 */
function radio_timing (r_time, seconds) {
  for (var i = 0; i < seconds; i++) {
    sleep(1000);
    if (i % 5 == 0)//每5秒打印一次信息
    {
      console.info("广播已经收听" + (i + 1 + r_time) + "秒,剩余" + (seconds - i - 1) + "秒!");
    }
    if (i % 15 == 0)//每15秒弹一次窗防止息屏
    {
      toast("这是防息屏弹窗，可忽略-. -");
    }
  }
}
// export default (radioStudy)
exports.radioStudy = radioStudy;
exports.stopradioStudy = stopradioStudy