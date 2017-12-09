var request = require('request');

module.exports = function (app) {

  app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By",' 3.2.1');
      res.header("Content-Type", "application/json;charset=utf-8");
      next();
    });

  app.route('/wechat').get(function(req,res){
    var token="jerry";
    var signature = req.query.signature,
      timestamp = req.query.timestamp,
      echostr   = req.query.echostr,
      nonce     = req.query.nonce;
      oriArray = new Array();
      oriArray[0] = nonce;
      oriArray[1] = timestamp;
      oriArray[2] = token;
      oriArray.sort();
      var original = oriArray.join('');

      var shaObj = new jsSHA(original, 'TEXT');
      var scyptoString = shaObj.getHash('SHA-1', 'HEX');

     if (signature == scyptoString) {
        res.send(echostr);
     } else {
        res.send('bad token');
     }
  });

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
};
