var utils = require('./utils')

function articleStudy () {
  let h = device.height;//屏幕高
  let w = device.width;//屏幕宽
  let x = (w / 3) * 2;//横坐标2分之3处
  let h1 = (h / 6) * 5;//纵坐标6分之5处
  let h2 = (h / 6);//纵坐标6分之1处
  click('推荐')
  utils.delay(3)
  var date = utils.getTodayDateString();//获取当天日期字符串
  console.log('以日期开始点击' + date);
  //6篇文章，每一篇1分钟，相当于12积分
  for (var i = 0, t = 0; i < 6;) {
    //这里判断是否点击到文章
    if (click(date, t)) {
      utils.delay(2)
      //这里判断是否时文章页面 是-》退出、下划，否-》浏览，次数+1，退出
      if (text("展开").exists()) {
        utils.delay(2)
        console.log('非文章界面，退出');
        back()
        console.log('往下划');
        utils.delay(1)
        swipe(x, h1, x, h2, 500);//往下翻（纵坐标从5/6处滑到1/6处）
        utils.delay(2)
      } else {
        article_timing(i, 60)
        i++;
        console.log(t);
        back()
      }
    } else {
      console.log('往下划');
      swipe(x, h1, x, h2, 500);//往下翻（纵坐标从5/6处滑到1/6处）
    }
  }
  utils.delay(3)
}

/**
   * @description: 文章学习计时(弹窗)函数
   * @param: n-文章标号 seconds-学习秒数
   * @return: null
   */
function article_timing (n, seconds) {
  //随机阅读文章的时间
  seconds = parseInt(seconds);
  var randNum = random(0, 5);
  randNum = parseInt(randNum);
  seconds = seconds + randNum;

  h = device.height;//屏幕高
  w = device.width;//屏幕宽
  x = (w / 3) * 2;
  h1 = (h / 6) * 5;
  h2 = (h / 6);

  for (var i = 0; i < seconds; i++) {
    if (i % 5 == 0)//每5秒打印一次学习情况
    {
      console.info("第" + (n + 1) + "篇文章已经学习" + (i + 1) + "秒,剩余" + (seconds - i - 1) + "秒!");
    }
    sleep(1000);
    if (i % 10 == 0)//每10秒滑动一次，如果android版本<7.0请将此滑动代码删除
    {
      toast("这是防息屏toast,请忽视-。-");
      if (i <= seconds / 2) {
        swipe(x, h1, x, h2, 500);//向下滑动
      }
      else {
        swipe(x, h2, x, h1, 500);//向上滑动
      }
    }
  }
}
module.exports = articleStudy;
