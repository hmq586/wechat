# 2017-12-09

Express: Web 应用程序框架

11:25AM: it is NOT NECESSARY to specify proxy in Nodejs code!!! Only set proxy in cmd is far enough

* 4:33PM 最小系统法可以工作。。。

# 2017-12-10

Nodejs执行结果和浏览器里结果不一样。。。

# 2017-12-13

* node-inspector &
* node --debug app.js
* 通过URL http://127.0.0.1:8080/debug?port=5858 就可以进行调试了。

网页授权获取用户基本信息: 订阅号无法开通此接口, 服务号必须通过微信认证
可以使用测试公众号.

# 2017-12-17 2:47PM

download PHP plugin in home: disable proxy in Eclipse
http://localhost:8098/jerrytest.php?code=Swim - 相当于这个php page就是一个code的接收器。

http://download.eclipse.org/tools/pdt/updates/5.0

# 2017-12-18 6:57PM

could not directly reply html page in wechat.
url复制到微信里手动能够打开： https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx73b49bfe02fd3a17&redirect_uri=https://wechatjerry.herokuapp.com/tokenCallback&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect
授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理

# API

* Jerry test account get access token: https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx73b49bfe02fd3a17&secret=8a269a9916c32069901c2e6b6f3f16a6

