"ui";
//引入各个功能模块
var start = require('./start') //启动app
var radioStudy = require('./radioStudy');//电台学习
var articleStudy = require('./articleStudy') //文章学习
var utils = require('./utils')
//Android 库
importClass(android.view.KeyEvent);
importClass(android.webkit.WebView);
importClass(android.webkit.WebChromeClient);
importClass(android.webkit.WebResourceResponse);
importClass(android.webkit.WebViewClient);
//这里color不能删除，定义tint的颜色
var color = "#009688";
var storage = storages.create("crad")//本地缓存卡密
//看有没有这个值
var b = storage.contains("cradnumber")
ui.statusBarColor("#009688")
//UI模块
login()
function login () {
  ui.layout(
    <frame>
      <vertical h="auto" align="center" margin="0 50">

        <text textColor="black" textSize="16sp" id="indexText" />

        <linear>
          <text w="56" gravity="center" color="#111111" size="16">卡密</text>
          <input id="card" w="230" h="40" text={showcard()} />
          <checkbox id="check1" text="记住卡密"></checkbox>
        </linear>
        <button style="Widget.AppCompat.Button.Colored" id="login" text="登录" />
      </vertical>
    </frame>
  )
  //这是记住密码的状态
  test()
  function test () {
    if (b) {
      ui.check1.checked = true
    } else {
      ui.check1.checked = false
    }
  }
  //登录事件
  ui.login.click(function () {
    var card = ui.card.text()
    if (card === '123456') {//打包的卡密数据不是这个
      toastLog('卡密到期时间为2021-6-21')
      showIndex()
    } else if (card === '') {
      toastLog('卡密不得为空')
    } else {
      toastLog('找不到卡密')
    }
  })
  ui.check1.on("check", (checked) => {
    if (checked) {
      toast('点击')
      var card = ui.card.text()//获取输入的值
      storage.put("cradnumber", card)
    } else {
      toast('取消')
      storage.remove("cradnumber")
    }
  })
  function showcard () {
    if (b) {
      var cardtext = storage.get("cradnumber")

      return cardtext
    } else {
      return ''
    }

  }
  //文字设置
  ui.indexText.setText("卡密只是单纯防止恶意传播的一种方式，卡密本身免费\n微信关注“软件开发者交流”发送1获取卡密\n使用方式简单，只需点击默认执行即可\n目前不会智能判断需要刷多少分，后续会慢慢开发\n软件仅限个人学习使用");
}

function showIndex () {
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
          <frame>
            <webview id="webview" h="*" w="*" />
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
  //webview -> 参考：https://blog.csdn.net/snailuncle2/article/details/114269754
  let webview = ui.webview;
  let set = webview.getSettings();
  set.setAllowFileAccessFromFileURLs(false);
  set.setAllowUniversalAccessFromFileURLs(false);
  set.setSupportZoom(false);
  set.setJavaScriptEnabled(true);

  var webcc = new JavaAdapter(WebChromeClient, {
    onPageFinished: function (view, url) {
      console.log(url);
      toast("页面加载完成");
    },
  });

  var client = android.webkit.WebViewClient;

  var t = new JavaAdapter(client, {
    onPageFinished: function (view, url) {
      console.log(url);
      toast("页面加载完成");
    },
  });

  webview.setOnKeyListener(
    new android.view.View.OnKeyListener({
      onKey: function (v, keyCode, event) {
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
          if (keyCode == KeyEvent.KEYCODE_BACK && webview.canGoBack()) {
            //表示按返回键
            log("返回键");
            webview.goBack(); //后退
            //webview.goForward();//前进
            return true; //已处理
          }
        }
        return false;
      },
    })
  );

  webview.setWebViewClient(t);
  webview.setWebChromeClient(webcc);

  webview.loadUrl("https://github.com/LSFCXZ/Autojs_xxqg");
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
        alert("关于", "Code v0.0.3 -alpha.4 内测版本");
        break;
    }
    e.consumed = true;
  });
  activity.setSupportActionBar(ui.toolbar);
  //设置滑动页面的标题
  ui.viewpager.setTitles(["首页", "测试功能", "声明", "更新"]);
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
}




