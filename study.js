var utils = require('./utils')
var xxqg = getPackageName("学习强国");
var db = require('./data')
importClass(android.database.sqlite.SQLiteDatabase);
//特殊题，特点：题目一样，答案不同
var ZiXingTi = "选择词语的正确词形。"; //字形题
var DuYinTi = "选择正确的读音。";//读音题 20201211
var ErShiSiShi = "下列不属于二十四史的是。";//二十四史
var lCount = 100;//挑战答题轮数
var qCount = 1000;//挑战答题每轮答题数(5~7随机)
function study () {
  console.log('该模块为训练本地题库，非源码运行请退出');
  utils.delay(1)
  if (!(app.launchPackage(xxqg))) {
    console.log('找不到应用');
    return
  }
  utils.delay(1)
  console.log('初始化完毕');
  utils.delay(2)
  click('我的')
  utils.delay(2)
  click('我要答题')
  utils.delay(2)
  className("android.view.View").text("答题练习").findOne().parent().child(10).click();//点击挑战答题
  console.log("开始挑战答题")
  utils.delay(4)
  // var question = className("ListView").findOnce().parent().child(0).text();//问题
  // var options = [];//选项列表
  // if (className("ListView").exists()) {
  //   className("ListView").findOne().children().forEach(child => {
  //     var answer_q = child.child(0).child(1).text();
  //     options.push(answer_q);
  //   });
  //   //查库
  //   var answer = db.getAnswer(question, 'tiku')
  //   if (answer.length === 0) {
  //     var answer1 = utils.getAnswer(question, 'tikuNet')
  //   }
  //   console.log('问题' + question);
  //   console.log('选项' + options);
  //   console.info('答案' + answer)
  //   console.info('答案' + answer1)

  // }
  let conNum = 0;//连续答对的次数
  let lNum = 1;//轮数
  while (true) {
    challengeQuestionLoop(conNum);
    utils.delay(4);
    if (text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
      "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists() || text("再来一局").exists())//遇到❌号，则答错了,不再通过结束本局字样判断
    {//该部分修改，逻辑为a：>=5题，失败则结束挑战答题返回主界面;b0：<5题，第一次失败，分享复活；b1：分享复活再次失败，仍<5题，需再来一局；b2：分享复活再次失败，已>5题，结束挑战答题返回主界面
      utils.delay(2);
      if (lNum >= lCount && conNum >= qCount) {
        console.log("挑战答题结束！返回主页！");
        if (textContains("结束本局").exists()) {
          /*在分享页面回退4次返回主页*/
          back(); utils.delay(1);
          back(); utils.delay(1);
          back(); utils.delay(1);
          back(); utils.delay(1);
        } else {
          /*在本局结束页面回退3次返回主页*/
          back(); utils.delay(1);
          back(); utils.delay(1);
          back(); utils.delay(1);
        }
        break;
      } else if (textContains("分享就能复活").exists() || textContains("每周仅可复活一次").exists()) {
        console.log("分享复活...")
        utils.delay(1);
        click("分享就能复活");
        utils.delay(2);
        console.info("分享成功!");
        back();//返回答题界面
        utils.delay(4);
      } else {
        console.log("等3秒开始下一轮...")
        utils.delay(3);//等待3秒开始下一轮
        text("再来一局").click();
        /* back();
         //desc("结束本局").click();//有可能找不到结束本局字样所在页面控件，所以直接返回到上一层
         delay(1);
         //desc("再来一局").click();
         back();
      if(!textContains("答题练习").exists()){
        while (!text("答题练习").exists());//排行榜 答题竞赛
        delay(1);
        className("android.view.View").text("答题练习").findOne().parent().child(10).click();
      }else{
        while (!text("挑战答题").exists());
        delay(1);
        text("挑战答题").click();//原流程，20200910改版
       }*/
        utils.delay(4);
        if (conNum >= qCount) {
          lNum++;
        }
        conNum = 0;
      }
      console.warn("第" + (lNum + 1).toString() + "轮开始...")
    }
    else//答对了
    {
      conNum++;
    }
  }
}
/**
 * @description: 挑战答题循环
 * @param: conNum 连续答对的次数
 * @return: null
 */
function challengeQuestionLoop (conNum) {
  let ClickAnswer;//定义已点击答案
  if (conNum >= qCount)//答题次数足够退出，每轮qCount=5+随机1-3次
  {
    let listArray = className("ListView").findOnce().children();//题目选项列表
    let i = random(0, listArray.length - 1);
    console.log("本轮答题数足够，随机点击答案");
    var question = className("ListView").findOnce().parent().child(0).text();
    question = question.replace(/\s/g, "");
    var options = [];//选项列表
    if (className("ListView").exists()) {
      className("ListView").findOne().children().forEach(child => {
        var answer_q = child.child(0).child(1).text();
        options.push(answer_q);
      });
    } else {
      console.error("答案获取失败!");
      return;
    }//20201217添加 极低概率下，答题数足够，下一题随机点击，碰到字形题
    if (question == ZiXingTi.replace(/\s/g, "") || question == DuYinTi.replace(/\s/g, "") || question == ErShiSiShi.replace(/\s/g, "")) {
      question = question + options[0]; //字形题 读音题 在题目后面添加第一选项               
    }
    console.log((conNum + 1).toString() + ".随机点击题目：" + question);
    utils.delay(random(0.5, 1));//随机延时0.5-1秒
    listArray[i].child(0).click();//随意点击一个答案
    ClickAnswer = listArray[i].child(0).child(1).text();;//记录已点击答案
    console.log("随机点击:" + ClickAnswer);
    //如果随机点击答案正确，则更新到本地题库tiku表
    utils.delay(0.5);//等待0.5秒，是否出现X
    if (!text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
      "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists() || text("再来一局").exists())//遇到❌号，则答错了,不再通过结束本局字样判断
    {
      console.log("更新本地题库答案...");
      checkAndUpdate(question, answer, ClickAnswer);
    }
    console.log("---------------------------");
    return;
  }
  if (className("ListView").exists()) {
    var question = className("ListView").findOnce().parent().child(0).text();
  }
  else {
    console.error("提取题目失败!");
    let listArray = className("ListView").findOnce().children();//题目选项列表
    let i = random(0, listArray.length - 1);
    console.log("随机点击");
    utils.delay(random(0.5, 1));//随机延时0.5-1秒
    listArray[i].child(0).click();//随意点击一个答案
    return;
  }
  var chutiIndex = question.lastIndexOf("出题单位");
  if (chutiIndex != -1) {
    question = question.substring(0, chutiIndex - 2);
  }
  question = question.replace(/\s/g, "");
  var options = [];//选项列表
  if (className("ListView").exists()) {
    className("ListView").findOne().children().forEach(child => {
      var answer_q = child.child(0).child(1).text();
      options.push(answer_q);
    });
  } else {
    console.error("答案获取失败!");
    return;
  }
  if (question == ZiXingTi.replace(/\s/g, "") || question == DuYinTi.replace(/\s/g, "") || question == ErShiSiShi.replace(/\s/g, "")) {
    question = question + options[0]; //字形题 读音题 在题目后面添加第一选项               
  }
  console.log((conNum + 1).toString() + "搜库题目：" + question);
  var answer = db.getAnswer(question, 'tiku');
  if (answer.length == 0) {//tiku表中没有则到tikuNet表中搜索答案
    answer = db.getAnswer(question, 'tikuNet');
  }
  console.info("答案：" + answer);
  if (/^[a-zA-Z]{1}$/.test(answer)) {//如果为ABCD形式
    var indexAnsTiku = indexFromChar(answer.toUpperCase());
    answer = options[indexAnsTiku];
    toastLog("answer from char=" + answer);
  }
  let hasClicked = false;
  let listArray = className("ListView").findOnce().children();//题目选项列表
  if (answer == "")//如果没找到答案
  {
    let i = random(0, listArray.length - 1);
    console.error("没有找到答案，随机点击");
    utils.delay(random(0.5, 1));//随机延时0.5-1秒
    listArray[i].child(0).click();//随意点击一个答案
    ClickAnswer = listArray[i].child(0).child(1).text();;//记录已点击答案
    hasClicked = true;
    console.log("随机点击:" + ClickAnswer);//如果随机点击答案正确，则更新到本地题库tiku表
    utils.delay(0.5);//等待0.5秒，是否出现X
    if (!text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
      "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists() || text("再来一局").exists())//遇到❌号，则答错了,不再通过结束本局字样判断
    {
      console.log("更新本地题库答案...");
      checkAndUpdate(question, answer, ClickAnswer);
    }
    console.log("---------------------------");
  }
  else//如果找到了答案
  {
    listArray.forEach(item => {
      var listDescStr = item.child(0).child(1).text();
      if (listDescStr == answer) {
        utils.delay(random(0.5, 1));//随机延时0.5-1秒
        item.child(0).click();//点击答案
        hasClicked = true;
        utils.delay(0.5);//等待0.5秒，是否出现X
        if (!text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
          "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists() || text("再来一局").exists())//遇到❌号，则答错了,不再通过结束本局字样判断
        { console.log("题库答案正确……"); }
        if (text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
          "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists() || text("再来一局").exists())//遇到❌号，则答错了,不再通过结束本局字样判断
        {
          console.error("题库答案错误!!!");
          /*checkAndUpdate(question, answer, ClickAnswer);*/
        }
        console.log("---------------------------");
      }
    });
  }
  if (!hasClicked)//如果没有点击成功
  {//因导致不能成功点击问题较多，故该部分不更新题库，大部分问题是题库题目适配为填空题或多选题或错误选项
    console.error("未能成功点击，随机点击");
    let i = random(0, listArray.length - 1);
    utils.delay(random(0.5, 1));//随机延时0.5-1秒
    listArray[i].child(0).click();//随意点击一个答案
    console.log("随机点击:" + ClickAnswer);
    utils.delay(0.5);//等待0.5秒，是否出现X
    if (!text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
      "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists() || text("再来一局").exists())//遇到❌号，则答错了,不再通过结束本局字样判断
    { console.log("随机点击正确……"); }
    if (text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
      "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists() || text("再来一局").exists())//遇到❌号，则答错了,不再通过结束本局字样判断
    {
      console.error("随机点击错误!!!");
      /*checkAndUpdate(question, answer, ClickAnswer);*/
    }
    console.log("---------------------------");
  }
}
/**
 * @description: 检查答案是否正确，并更新数据库
 * @param: question, ansTiku, answer
 * @return: null
 */
function checkAndUpdate (question, ansTiku, answer) {
  if (className("Button").desc("下一题").exists() || className("Button").desc("完成").exists()) {//答错了
    swipe(100, device.height - 100, 100, 100, 500);
    var nCout = 0
    while (nCout < 5) {
      if (descStartsWith("正确答案").exists()) {
        var correctAns = descStartsWith("正确答案").findOnce().desc().substr(5);
        console.info("正确答案是：" + correctAns);
        if (ansTiku == "") { //题库为空则插入正确答案                
          var sql = "INSERT INTO tiku VALUES ('" + question + "','" + correctAns + "','')";
        } else { //更新题库答案
          var sql = "UPDATE tiku SET answer='" + correctAns + "' WHERE question LIKE '" + question + "'";
        }
        insertOrUpdate(sql);
        console.log("更新题库答案...");
        delay(1);
        break;
      } else {
        var clickPos = className("android.webkit.WebView").findOnce().child(2).child(0).child(1).bounds();
        click(clickPos.left + device.width * 0.13, clickPos.top + device.height * 0.1);
        console.error("未捕获正确答案，尝试修正");
      }
      nCout++;
    }
    if (className("Button").exists()) {
      className("Button").findOnce().click();
    } else {
      click(device.width * 0.85, device.height * 0.06);
    }
  } else { //正确后进入下一题，或者进入再来一局界面
    if (ansTiku == "" && answer != "") { //正确进入下一题，且题库答案为空              
      var sql = "INSERT INTO tiku VALUES ('" + question + "','" + answer + "','')";
      insertOrUpdate(sql);
      console.log("更新题库答案...");
    }
  }
}
/**
 * @description: 增加或更新数据库
 * @param: sql
 * @return: null
 */
function insertOrUpdate (sql) {
  var dbName = "tiku.db";
  var path = files.path(dbName);
  if (!files.exists(path)) {
    //files.createWithDirs(path);
    console.error("未找到题库!请将题库放置与js同一目录下");
  }
  var db = SQLiteDatabase.openOrCreateDatabase(path, null);
  db.execSQL(sql);
  db.close();
}
exports.study = study
