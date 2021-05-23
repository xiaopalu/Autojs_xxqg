var utils = require('./utils')
var db = require('./dbhelper')
// var start = require('./start')
var xxqg = getPackageName("学习强国");

//函数需要通讯的数据
// var question = ''//问题
// var answer = ''//答案
// var answer1 = ''//答案1
// var options = [];//选项列表
// var i = 1   //i->答对次数

// //随机一个答案
// var ran = Math.floor((Math.random() * (options.length - 0 + 0) + 0))
// var answer3 = options[ran]

//学习文章主函数
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
  /**
   * 需要思考问题：->采用函数去封装功能
   * 答题第一次错误
   * 题库1 题库2 是否有答案->没有随机点击
   * 答案是否正确                            小概率
   * 答案是否可以点击->文字不一样造成不能点击  小概率
   * 随机点击是否正确
   * 随机的是6次以内还是6次外
   * 如果已经6次后就不点击分享，是在有分享的情况下，就是1次性答对6题
   */

  //答对6次则退出循环 每个点击过后 ->都要判断对错，是否达到次数->是否结束本局或者分享
  var i = 0
  var tag = 0 //再来一局的次数
  while (i <= 6) {
    if (tag > 0 && i === 0) {
      console.info('你的运气爆棚，再来一局的次数：' + tag);
    }
    if (i === 6) {
      //等待45s
      console.log('完成了答题要求');
      console.log('程序选择等待，死亡');
      utils.delay(3)
      console.log('3s过去,我就是不点，就玩');
      utils.delay(3)
      console.log('6s过去,你就是不能自己操作');
      for (var t = 0; t < 39; t++) {
        utils.delay(1)
        console.info((t + 7) + '秒过去')
      }
      console.log('非常感谢你的等待，现在返回主页');
      utils.delay(1)
      if (text("分享就能复活").exists()) {
        click('结束本局')
        utils.delay(2)
        back()
        utils.delay(2)
        back()
        utils.delay(2)
        back()
        utils.delay(2)
        console.log('完成了自己的使命，现在关闭悬浮窗，再见');
        utils.delay(3)
        console.info('还会再见吗？');
        utils.delay(3)
        console.log('再见的时候要开心，快乐');
        utils.delay(2)
        alert('开心，快乐哈o(*￣▽￣*)ブ')
        utils.delay(2)
        console.log('好的，再见');
        utils.delay(3)
        console.hide();
        utils.delay(5)
        console.show();
        console.info('5秒不见，甚是想念！！');
        utils.delay(2)
        console.error('毁灭了！');
        utils.delay(6)
        console.hide();
      } else if (text("再来一局").exists()) {
        utils.delay(2)
        back()
        utils.delay(2)
        back()
        utils.delay(2)
        back()
        console.log('完成了自己的使命，现在关闭悬浮窗，再见');
        utils.delay(3)
        console.info('还会再见吗？');
        utils.delay(3)
        console.log('再见的时候要开心，快乐');
        utils.delay(2)
        alert('开心，快乐哈o(*￣▽￣*)ブ')
        utils.delay(2)
        console.log('好的，再见');
        utils.delay(3)
        console.hide();
        utils.delay(5)
        console.show();
        console.info('5秒不见，甚是想念！！');
        utils.delay(2)
        console.error('毁灭了！');
        utils.delay(6)
        console.hide();
      }

      return
    }
    //获取问题和选项
    var question = className("ListView").findOnce().parent().child(0).text();//问题
    var options = [];//选项列表
    //循环界面选项并加入列表
    if (className("ListView").exists()) {
      className("ListView").findOne().children().forEach(child => {
        var answer_q = child.child(0).child(1).text();
        options.push(answer_q);
      });
    }
    //随机一个答案
    var ran = Math.floor((Math.random() * (options.length - 0 + 0) + 0))
    var answer3 = options[ran]
    //查库
    var answer = db.getAnswer(question, 'tiku')
    if (answer.length === 0) {
      answer1 = db.getAnswer(question, 'tikuNet')
    }
    //tiku表有答案->答案是否正确
    if (answer !== '') {
      utils.delay(1)
      console.info(answer);
      click(answer)
      utils.delay(4)//要判断 ->需要时间
      if (text("分享就能复活").exists() || text("再来一局").exists()) {
        console.log('答案错误');
        if (i < 6) {
          console.log('没有达到次数,分享或者再来一局');
          utils.delay(2)
          if (text("分享就能复活").exists()) {
            console.log('进入分享');
            click('分享就能复活')
            utils.delay(2)
            back()
            utils.delay(3)
            // i--
          } else {
            console.log('再来一局');
            click('再来一局')
            i = 0
            tag++
            utils.delay(3)
          }
        }
      }
      i++
      console.log('答对次数：' + i);
      utils.delay(2)
    } else if (answer1 !== '') {//tikuNet表有答案->是否答案正确
      utils.delay(1)
      console.info(answer1);
      //都是选项ABCD
      if (answer1 == 'A') {
        var check = click(options[0])
        console.log('是否点击到' + check);
        utils.delay(4)//要等判断，一定程度影响了用户体验
        if (text("分享就能复活").exists() || text("再来一局").exists()) {
          console.log('答案错误');
          if (i < 6) {
            console.log('没有达到次数,分享或者再来一局');
            utils.delay(2)
            if (text("分享就能复活").exists()) {
              console.log('进入分享');
              click('分享就能复活')
              utils.delay(2)
              back()
              utils.delay(3)
              // i--
            } else {
              console.log('再来一局');
              click('再来一局')
              i = 0
              tag++
              utils.delay(3)
            }
          }
        }
        i++
        console.log('答对次数：' + i);
        utils.delay(2)
      } else if (answer1 == 'B') {
        var check1 = click(options[1])
        console.log('是否点击到' + check1);
        utils.delay(4)
        if (text("分享就能复活").exists() || text("再来一局").exists()) {
          console.log('答案错误');
          if (i < 6) {
            console.log('没有达到次数,分享或者再来一局');
            utils.delay(2)
            if (text("分享就能复活").exists()) {
              console.log('进入分享');
              click('分享就能复活')
              utils.delay(2)
              back()
              utils.delay(3)
              // i--
            } else {
              console.log('再来一局');
              click('再来一局')
              i = 0
              tag++
              utils.delay(3)
            }
          }
        }
        i++
        console.log('答对次数：' + i);
        utils.delay(2)
      } else if (answer1 == 'C') {
        var check2 = click(options[2])
        console.log('是否点击到' + check2);
        utils.delay(4)
        if (text("分享就能复活").exists() || text("再来一局").exists()) {
          console.log('答案错误');
          if (i < 6) {
            console.log('没有达到次数,分享或者再来一局');
            utils.delay(2)
            if (text("分享就能复活").exists()) {
              console.log('进入分享');
              click('分享就能复活')
              utils.delay(2)
              back()
              utils.delay(3)
              // i--
            } else {
              console.log('再来一局');
              click('再来一局')
              i = 0
              tag++
              utils.delay(3)
            }
          }
        }
        i++
        console.log('答对次数：' + i);
        utils.delay(2)
      } else {
        var check3 = click(options[3])
        console.log('是否点击到' + check3);
        utils.delay(4)
        if (text("分享就能复活").exists() || text("再来一局").exists()) {
          console.log('答案错误');
          if (i < 6) {
            console.log('没有达到次数,分享或者再来一局');
            utils.delay(2)
            if (text("分享就能复活").exists()) {
              console.log('进入分享');
              click('分享就能复活')
              utils.delay(2)
              back()
              utils.delay(3)
              // i--
            } else {
              console.log('再来一局');
              click('再来一局')
              i = 0
              tag++
              utils.delay(3)
            }
          }
        }
        i++
        console.log('答对次数：' + i);
        utils.delay(2)
      }
    } else { //随机点击
      utils.delay(1)
      console.info('随机挑选一个幸运答案，哈哈哈');
      click(answer3)
      utils.delay(4) //这里需要时间判断，一定程度牺牲了用户体验
      if (text("分享就能复活").exists() || text("再来一局").exists()) {
        console.log('随机错误');
        console.log('答对次数：' + i);
        if (i < 6) {
          console.log('没有达到次数,分享或者再来一局');
          utils.delay(2)
          if (text("分享就能复活").exists()) {
            console.log('进入分享');
            click('分享就能复活')
            utils.delay(2)
            back()
            utils.delay(3)

          } else {
            console.log('再来一局');
            click('再来一局')
            i = 0
            tag++
            utils.delay(3)
          }
        }
      } else {
        i++
        console.log('答对次数：' + i);
        // console.log('点击了随机答案：' + answer3);
        console.log('随机对了');

      }
    }
  }
}


exports.challengeanswer = challengeanswer;