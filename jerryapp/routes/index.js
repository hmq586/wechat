var request = require('request');
var jsSHA = require('jssha');
var tokenValidationTool = require("../tool/tokenValidation.js");
var echoService = require("../service/echo.js");
var tuningService = require("../service/tuning.js");
var createAccount = require("../service/createAccountInC4C.js");
var getXMLNodeValue = require("../tool/xmlparse.js");
var formattedValue = require("../tool/formatValue.js");
var replyMessage = require("../tool/replyMessage.js");
var config = require("../../config.js");
var notifyWechatUser = require("../service/getAccountinC4C.js");

module.exports = function (app) {

  app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By",' 3.2.1');
      res.header("Content-Type", "application/json;charset=utf-8");
      next();
    });

  app.route('/').get(function(req,res){
    if( req.query && req.query.echostr) {
      tokenValidationTool(req, res);
    }
    else{
      res.send("Hello World");
    }
  });

  app.route("/tokenCallback").get(function(req,res){
    if( req.query && req.query.code) {
      res.send(req.query.code);
    }
    else{
      res.send("no code");
    }
  });

  app.route('/c4c').post(function(req,res){
    var _da;
    console.log("new event from C4C--------------------------")
    req.on("data",function(data){
        _da = data.toString("utf-8");
    });

    req.on("end",function(){
        var payload = JSON.parse(_da);
        var AccountBOguid = payload.businessObjectId;
        notifyWechatUser(AccountBOguid, res);
    });
  });


  app.route('/').post(function(req,res){
    var _da;
    req.on("data",function(data){
        _da = data.toString("utf-8");
    });

    req.on("end",function(){
        console.log("new http post: " + _da);
        var msgType = formattedValue(getXMLNodeValue('MsgType',_da));
        if( msgType === "text"){
           var question = formattedValue(getXMLNodeValue('Content',_da));
           tuningService(_da, question, res);
        }
        else if( msgType === "voice"){
           var voice = formattedValue(getXMLNodeValue('Recognition',_da));
           tuningService(_da, voice, res);
        }
        else if( msgType === "event"){
          var event = formattedValue(getXMLNodeValue('Event',_da));
          if( event === "subscribe"){
            var replyxml = replyMessage(_da, "Welcome to Jerry's subscription account");
            // Jerry 2017-12-13 10:48PM Sean uses a Wechat post API to send reply to Wechat
            // instead of directly sending response using res API
            var fromUserName = formattedValue(getXMLNodeValue('FromUserName',_da));
            createAccount(fromUserName);
            res.send(replyxml);
          }
          else if( event === "CLICK"){
            var reply = "HeaderO<a href=\"https://www.baidu.com\">点击这里体验</a>";

            var eventtext = replyMessage(_da, reply);
            res.send(eventtext);
          };
        }
    });
  });

  app.route("/token").get(function(req, res){
    var oprions = {
          url:"https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+"ncc75g3kkO5yQvRQJTgqXINn3bNv8J6-TBym_3ANwazN4Ahzp952dpUpyPt8xjRlz-fTMbtPAVL1CJDzhzJvwxcxSLNDWPub6gsnWH-0Dc5HerR-0W5TBwyonxNM_ih9CZIcAHAWTC",
          method: "POST",
          json:true,
          headers: {
          "content-type": "application/json"},
          body:{
                 "button":[
                     {
                       "name":"账户管理",
                       "sub_button":[{
                            "type": "click",
                            "name": "创建账户",
                            "key": "dataCreate"
                       },{
                            "type": "view",
                            "name": "查询账户",
                             "url":"http://www.baidu.com/"
                       }]
                     },
                     {
                       "name":"试驾",
                       "sub_button":[{
                            "type": "click",
                            "name": "预约试驾",
                            "key": "tryDrive"
                       },{
                            "type": "click",
                            "name": "查询试驾",
                             "key": "queryDrive"
                       }]
                     }

                 ]
            }
        };
    request(oprions,function(error,response,data){
      console.log("response: " + response);
      console.log("error: " + error);
      console.log("data: " + data);
    });
  });

  app.route('/test').get(function (req, res) {
        var url = "https://www.baidu.com";
        console.log('/:' + url);
        // res.send("Hello");
        // Jerry 2017-12-9 11:04AM - no proxy works under normal network environment
          var options = {
            //url: "http://www.tuling123.com/openapi/api?key=de4ae9269c7438c33de5806562a35cac&info=%E6%88%90%E9%83%BD%E5%A4%A9%E6%B0%94%E9%A2%84%E6%8A%A5",
            url: "http://www.tuling123.com/openapi/api?key=成都天气预报",
            method: "GET"
          };
          request(options,function(error,response,data){
            if(data){
              res.send(data);
            }else {
              res.send("Jerry error: " + error);
              console.log(error);
            }
          });
        });  
};
