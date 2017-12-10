var request = require('request');
var jsSHA = require('jssha');
var tokenValidationTool = require("../tool/tokenValidation.js");
var getXMLNodeValue = require("../tool/xmlparse.js");
var replyMessage = require("../tool/replyMessage.js");
const content_pattern = /<!\[CDATA\[(.*)\]\]>/;

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

  app.route('/').post(function(req,res){
    var _da;
    req.on("data",function(data){
      /*微信服务器传过来的是xml格式的，是buffer类型，因为js本身只有字符串数据类型，
      所以需要通过toString把xml转换为字符串*/
        _da = data.toString("utf-8");
    });

    req.on("end",function(){
        var Content = getXMLNodeValue('Content',_da);
        var body = content_pattern.exec(Content);
        if( body.length === 2){
            Content = "Add by Jerry: " + body[1];
        } 
        var xml = replyMessage(_da, Content);
        res.send(xml);
    });
  });

  app.route('/test').get(function (req, res) {
        var url = "https://www.baidu.com";
        console.log('/:' + url);
        // res.send("Hello");
        // Jerry 2017-12-9 11:04AM - no proxy works under normal network environment
          var options = {
            url: url,
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
