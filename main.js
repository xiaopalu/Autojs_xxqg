"ui";
//引入各个功能模块
var start = require('./start') //启动app
var radioStudy = require('./radioStudy');//电台学习
var articleStudy = require('./articleStudy') //文章学习
var utils = require('./utils')
//这里color不能删除，定义tint的颜色
var color = "#009688";
//UI模块
ui.layout(
  <drawer id="drawer">
    <vertical>
      <appbar>
        <toolbar id="toolbar" title="Code" />
        <tabs id="tabs" />
      </appbar>
      <viewpager id="viewpager">
        <frame>
          <vertical>
            <text textColor="black" textSize="16sp" id="indexText" />
            <button style="Widget.AppCompat.Button.Colored" text="默认执行" id="start" />
            <button style="Widget.AppCompat.Button.Colored"
              text="开启无障碍"
              id="auto" />
            <button style="Widget.AppCompat.Button.Colored" text="开启悬浮窗" id="Suspended" />
          </vertical>
        </frame>
        <frame>
          <vertical>
            <text textColor="red" textSize="16sp" id="testxText" />
            <button style="Widget.AppCompat.Button.Colored" text="挑战答题" id="challenge" />
            <button style="Widget.AppCompat.Button.Colored" text="训练题库" id="study" />
            <button style="Widget.AppCompat.Button.Colored" text="电台随机测试" id="radiotest" />
          </vertical>
        </frame>
        <frame>
          <text textColor="green" textSize="16sp" id="explainText" />
        </frame>
      </viewpager>
    </vertical>
    <vertical layout_gravity="left" bg="#ffffff" w="280">
      <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg" />
      <list id="menu">
        <horizontal bg="?selectableItemBackground" w="*">
          <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}" />
          <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
        </horizontal>
      </list>
    </vertical>
  </drawer>
);

//文字设置
ui.indexText.setText("执行之前请确定开启无障碍模式和悬浮窗权限\n默认执行目前支持电台和浏览文章共计18分");
ui.testxText.setText("这是测试功能，开发人员使用，存在很大Bug，慎重使用")
ui.explainText.setText("本软件目前开源免费\n付款既被骗\n不得传播扩散使用\n仅供个人学习AutoJS使用\n开源地址：https://github.com/LSFCXZ/Autojs_xxqg")
/**
 * 首页模块
 */
//默认执行事件
ui.start.click(function () {
  //这里应该加入对悬浮窗的判断
  if (auto.service == null) {
    toastLog("请先开启无障碍服务！");
    return;
  };
  threads.start(function () {
    console.show();
    console.log('脚本开始运行，期间请不要中断程序');
    main()
  });
  function main () {
    start()
    radioStudy.radioStudy()
    articleStudy()
    radioStudy.stopradioStudy()
  }
})
//开启悬浮窗
ui.Suspended.click(function () {
  app.startActivity({
    packageName: "com.android.settings",
    className: "com.android.settings.Settings$AppDrawOverlaySettingsActivity",
    data: "package:" + context.getPackageName(),
  })
})
//开启无障碍模式
ui.auto.click(function () {
  toast('已经开启无障碍模式')
  // 用户没有勾选无障碍服务的选项时，跳转到页面让用户去开启
  if (auto.service == null) {
    app.startActivity({
      action: "android.settings.ACCESSIBILITY_SETTINGS"
    });
  }
})
/**
 * 测试功能模块
 */
//挑战答题
ui.challenge.click(function () {
  threads.start(function () {
    toastLog('正在十万火急开发中...')
  })
})
//训练题库
ui.study.click(function () {
  threads.start(function () {
    toastLog('正在十万火急开发中...')
  })
})
ui.radiotest.click(function () {
  threads.start(function () {
    toastLog('勿点击...')
    // console.show();
    // var xxqg = getPackageName("学习强国");
    // if (!(app.launchPackage(xxqg))) {
    //   console.log('找不到应用');
    //   return
    // }
    // while (!id("home_bottom_tab_button_work").exists());//等待加载出主页
    // console.log('加载到主页啦啦啦啦');
    // utils.delay(2)
    // radioStudy.radioStudy()
  })
})
// 创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
  menu.add("设置");
  menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
  switch (item.getTitle()) {
    case "设置":
      toast("还没有设置");
      break;
    case "关于":
      alert("关于", "Code V0.0.3 -alpha2 内测版本");
      break;
  }
  e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);
//设置滑动页面的标题
ui.viewpager.setTitles(["首页", "测试功能", "声明"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);
//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);
ui.menu.setDataSource([
  {
    title: "选项一",
    icon: "@drawable/ic_android_black_48dp"
  },
  {
    title: "选项二",
    icon: "@drawable/ic_settings_black_48dp"
  },
  {
    title: "选项三",
    icon: "@drawable/ic_favorite_black_48dp"
  },
  {
    title: "退出",
    icon: "@drawable/ic_exit_to_app_black_48dp"
  }
]);

ui.menu.on("item_click", item => {
  switch (item.title) {
    case "退出":
      exit()
      ui.finish();
      break;
  }
})