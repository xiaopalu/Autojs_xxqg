"ui";
//引入各个功能模块
var start = require('./start')
var radioStudy = require('./radioStudy');
var articleStudy = require('./articleStudy')

var xxqg = getPackageName("学习强国");
ui.layout(
  <vertical>
    <text id="myText" line="3" textStyle="bold" marginTop="162px" textSize="30sp" />
    <button style="Widget.AppCompat.Button.Colored" text="默认执行" id="start" />
    <button style="Widget.AppCompat.Button.Colored"
      text="开启无障碍"
      id="auto" />
    <button style="Widget.AppCompat.Button.Colored" text="开启悬浮窗" id="Suspended" />
  </vertical>
);
ui.myText.setText("执行之前请确定开启无障碍模式和悬浮窗权限\n默认执行目前支持电台和浏览文章共计18分");
//按钮点击事件
ui.start.click(function () {
  toast('点击')
  //这里应该加入对悬浮窗的判断
  if (auto.service == null) {
    toastLog("请先开启无障碍服务！");
    return;
  };
  threads.start(function () {
    console.show();
    console.log('脚本开始运行，期间不要中断程序');
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
  });
})
ui.Suspended.click(function () {
  app.startActivity({
    packageName: "com.android.settings",
    className: "com.android.settings.Settings$AppDrawOverlaySettingsActivity",
    data: "package:" + context.getPackageName(),
  })
})
ui.auto.click(function () {
  toast('已经启动')
  // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
  if (auto.service == null) {
    app.startActivity({
      action: "android.settings.ACCESSIBILITY_SETTINGS"
    });
  }
})







