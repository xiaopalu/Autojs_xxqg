//引入各个功能模块
var start = require('./start')
var radioStudy = require('./radioStudy');
var articleStudy = require('./articleStudy')

console.show()
var xxqg = getPackageName("学习强国");

main()

function main () {
  if (!(app.launchPackage(xxqg))) {
    console.log('找不到应用');
    return
  }
  start()//启动app
  radioStudy.radioStudy()//学习电台
  articleStudy()//文章学习
  radioStudy.stopradioStudy()//暂停广播
}




