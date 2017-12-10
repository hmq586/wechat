var request = require('request');
var jsSHA = require('jssha');
var tokenValidationTool = require("../tool/tokenValidation.js");
var echoService = require("../service/echo.js");
var tuningService = require("../service/tuning.js");

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
    echoService(req, res);
    // tuningService(req, res);
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
