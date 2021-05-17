var utils = require('./utils')

function articleStudy () {
  let h = device.height;//屏幕高
  let w = device.width;//屏幕宽
  let x = (w / 3) * 2;//横坐标2分之3处
  let h1 = (h / 6) * 5;//纵坐标6分之5处
  let h2 = (h / 6);//纵坐标6分之1处
  click('推荐')
  utils.delay(3)
  var s = utils.getTodayDateString();//获取当天日期字符串
  console.log('以日期开始点击' + s);

  //循环6次，每次1分钟
  for (var i = 0; i < 6; i++) {
    if (click(s, i)) {
      article_timing(i, 60)
      back()
      utils.delay(3)
    } else {
      swipe(x, h1, x, h2, 500);//往下翻（纵坐标从5/6处滑到1/6处）
      click(s, i)
      article_timing(i, 60)
      back()
      utils.delay(3)
    }

  }

  /**
   * @description: 文章学习计时(弹窗)函数
   * @param: n-文章标号 seconds-学习秒数
   * @return: null
   */
  function article_timing (n, seconds) {
    seconds = parseInt(seconds);
    var randNum = random(0, 10);
    randNum = parseInt(randNum); //惨痛的教训:这里必须要转成int类型，否则就成了几百秒 xzy 2021-5-5更新
    seconds = seconds + randNum;
    h = device.height;//屏幕高
    w = device.width;//屏幕宽
    x = (w / 3) * 2;
    h1 = (h / 6) * 5;
    h2 = (h / 6);
    for (var i = 0; i < seconds; i++) {
      // while (!textContains("欢迎发表你的观点").exists())//如果离开了文章界面则一直等待
      // {
      //   console.error("当前已离开第" + (n + 1) + "文章界面，请重新返回文章页面...");
      //   utils.delay(2);
      // }
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

}
module.exports = articleStudy;
