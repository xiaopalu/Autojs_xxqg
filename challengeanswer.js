var utils = require('./utils')
var db = require('./dbhelper')
// var start = require('./start')
var xxqg = getPackageName("学习强国");
var answer1 = ''
function challengeanswer () {
  // start()//启动app
  if (!(app.launchPackage(xxqg))) {
    console.log('找不到应用');
    return
  }
  while (!id("home_bottom_tab_button_work").exists());//等待加载出主页
  console.log('加载到主页啦啦啦啦');
  click('我的')
  utils.delay(2)
  click('我要答题')
  utils.delay(2)
  className("android.view.View").text("答题练习").findOne().parent().child(10).click();//点击挑战答题
  console.log("开始挑战答题")
  utils.delay(3)
  //答对6次则退出循环 
  var i = 0//i->答对次数
  while (i <= 6) {
    var question = className("ListView").findOnce().parent().child(0).text();//问题
    var options = [];//选项列表
    //循环界面选项并加入列表
    if (className("ListView").exists()) {
      className("ListView").findOne().children().forEach(child => {
        var answer_q = child.child(0).child(1).text();
        options.push(answer_q);
      });
    }
    var ran = Math.floor((Math.random() * (options.length - 0 + 0) + 0))
    var answer3 = options[ran]
    //查库 -》答案可能错误的情况,答案是正确的，但是少字，导致点击不了
    var answer = db.getAnswer(question, 'tiku')
    if (answer.length === 0) {
      answer1 = db.getAnswer(question, 'tikuNet')
    }
    if (answer !== '') {
      utils.delay(1)
      console.info(answer);
      click(answer)
      if (text("分享就能复活").exists() || text("再来一局").exists()) {
        console.log('答案是错误滴');
        i--
        break
      }
      i++
      utils.delay(2)
    } else if (answer1 !== '') {
      utils.delay(1)
      console.info(answer1);
      i++
      if (answer1 == 'A') {
        click(options[0])
        utils.delay(2)
      } else if (answer1 == 'B') {
        click(options[1])
        utils.delay(2)
      } else if (answer1 == 'C') {
        click(options[2])
        utils.delay(2)
      } else {
        click(options[3])
        utils.delay(2)
      }
    } else {
      console.info('随机挑选一个幸运答案，哈哈哈');
      utils.delay(1)
      click(answer3)
      utils.delay(2)
      if (text("分享就能复活").exists()) {
        console.log('冒烟测试！！！');
        click('分享就能复活')
        utils.delay(2)
        back()
        utils.delay(3)
      } else if (text('再来一局').exists()) {
        utils.delay(2)
        if (i < 6) {
          console.log('没有答对6题继续开始');
          click('再来一局')
          utils.delay(4)
        }
      }
    }
    if (i === 6) {
      console.log('已经答对6道题目，随机点击了哦！');
      utils.delay(2)
      click(answer3)
      utils.delay(2)
      //这里可能存在连续答对的情况 ->通过判断“再来一局”是否显示而做出选择
      if (!(text('再来一局').exists())) {
        console.log('真幸运，又对了！！');
        i--
      }
      if (text('再来一局').exists()) {
        console.log('错了');
        utils.delay(2)
        back()
        utils.delay(2)
        back()
        utils.delay(2)
        back()
        console.log('到达首页!');
        return
      }
    }


  }

}
exports.challengeanswer = challengeanswer;