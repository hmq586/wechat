var express = require('express');
//    routesEngine = require('./jerryapp/routes/index.js'); // index.js actually
    // X, X.js, X.json and X.node see blog http://www.ruanyifeng.com/blog/2015/05/require.html
var request = require('request');
    
var app = express();

app.listen(process.env.PORT || 3000, function () {
      // c:\\code\\git\\wechat\\app
  console.log('Listening on port 18080, process.cwd(): ' + process.cwd() );
});

    /*
    app.route('/').get(function (req, res) {
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
    */

app.get('/', function(req, res){
      console.log("method: " + req.method);
      var url = "https://www.baidu.com";
      console.log('/:' + url);
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