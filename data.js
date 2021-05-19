importClass(android.database.sqlite.SQLiteDatabase);
/**
 * @description: 从数据库中搜索答案
 * @param: question 问题 
 *  @param: table_name表名
 * @return: answer 答案
 */
function getAnswer (question, table_name) {
  var dbName = "tiku.db";//题库文件名
  var path = files.path(dbName);

  var db = SQLiteDatabase.openOrCreateDatabase(path, null);

  sql = "SELECT answer FROM " + table_name + " WHERE question LIKE '" + question + "%'"
  var cursor = db.rawQuery(sql, null);
  if (cursor.moveToFirst()) {
    var answer = cursor.getString(0);
    cursor.close();
    return answer;
  }
  else {
    console.error("题库中未找到答案");
    cursor.close();
    return '';
  }
}
/**
 * @description: 检查答案是否正确，并更新数据库
 * @param: question, ansTiku, answer 点击的答案
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
exports.getAnswer = getAnswer
exports.checkAndUpdate = checkAndUpdate