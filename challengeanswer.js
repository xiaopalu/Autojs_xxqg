var utils = require('./utils')
var db = require('./data')
// var start = require('./start')
var xxqg = getPackageName("学习强国");
function challengeanswer () {
  // start()//启动app
  if (!(app.launchPackage(xxqg))) {
    console.log('找不到应用');
    return
  }
  utils.delay(1)
  console.log('初始化完毕');
  click('我的')
  utils.delay(2)
  click('我要答题')
  utils.delay(2)
  className("android.view.View").text("答题练习").findOne().parent().child(10).click();//点击挑战答题
  console.log("开始挑战答题")
  utils.delay(4)
  //以下测试代码
  while (true) {
    var question = className("ListView").findOnce().parent().child(0).text();//问题
    var options = [];//选项列表
    //循环界面选项并加入列表
    if (className("ListView").exists()) {
      className("ListView").findOne().children().forEach(child => {
        var answer_q = child.child(0).child(1).text();
        options.push(answer_q);
      });
      utils.delay(3)
      //查库
      var answer = db.getAnswer(question, 'tiku')
      if (answer.length === 0) {
        var answer1 = utils.getAnswer(question, 'tikuNet')
      }
      console.log('问题' + question);
      console.log('选项' + options);
      console.info('答案' + answer)
      console.info('答案' + answer1)
    }
  }




  // click(answer)


}
exports.challengeanswer = challengeanswer