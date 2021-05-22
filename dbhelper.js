importClass(android.database.sqlite.SQLiteDatabase);
/**
 * @description: 从数据库中搜索答案
 * @param: question 问题 
 * @param: table_name表名
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

exports.getAnswer = getAnswer