var utils = require('./utils')
/**
 * 这里代码应该还有更好的写法 Auto LSF 2021-5-20
 */
var radioArr = ['中国之声', '经济之声', '音乐之声', '经典音乐广播', '台海之声', '神州之声', '大湾区之声', '香港之声', '民族之声', '文艺之声', '老年之声', '藏语广播', '维吾尔语广播', '中国交通广播', '中国乡村之声']
var radioArr1 = ['北京新闻广播', '天津新闻广播', '河北新闻广播', '山西综合广播', '内蒙古新闻广播', '黑龙江新闻广播', '辽宁之声', '吉林新闻综合广播', '安徽之声', '福建新闻广播', '上海新闻广播', '江苏新闻广播']
var radioArr2 = ['北京交通广播', '天津交通广播', '河北交通广播', '山西交通广播', '内蒙古交通广播', '辽宁交通广播', '吉林交通广播', '黑龙江交通广播', '上海交通广播', '江苏交通广播网', '浙江交通之声', '安徽交通之声']

var ran = Math.floor((Math.random() * (radioArr.length - 0 + 0) + 0))//每个电台随机
var ran1 = Math.floor((Math.random() * (radioArr1.length - 0 + 0) + 0))//每个电台随机
var ran2 = Math.floor((Math.random() * (radioArr2.length - 0 + 0) + 0))//每个电台随机

var radioclass = ['国家广播电台', '各地新闻广播', '各地交通广播']
var rancla = Math.floor((Math.random() * (radioclass.length - 0 + 0) + 0))//电台分类随机
//全局变量
var arr = '' //分类下的电台
var cla = radioclass[rancla] //分类
//电台的分类随机后应该是加入判断，每个分类下面是不一样的电台，而电台又是随机的
if (rancla === 0) {
  //国家广播电台
  arr = radioArr[ran]
} else if (rancla === 1) {
  //各地新闻广播
  arr = radioArr1[ran1]
} else {
  //各地交通广播
  arr = radioArr2[ran2]
}
//电台收听
function radioStudy () {
  while (!id("home_bottom_tab_button_work").exists());//等待加载出主页
  console.log('开始随机点击电台');
  console.log('点击的电台分类：' + cla);
  console.log('点击的电台：' + arr);
  click('电台')
  utils.delay(2)
  click('听广播')
  utils.delay(3)
  click(cla)
  utils.delay(2)
  var b = click(arr)
  console.log('是否点击到电台' + b);
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
//停止播放电台
function stopradioStudy () {
  click('电台')
  utils.delay(2)
  click('听广播')
  utils.delay(3)
  click(radioArr[ran])
  utils.delay(2)
  id("v_play").findOnce(0).click();//点击暂停播放按钮
  console.log('暂停广播');
  utils.delay(3)
  back()
}
// export default (radioStudy)
exports.radioStudy = radioStudy;
exports.stopradioStudy = stopradioStudy