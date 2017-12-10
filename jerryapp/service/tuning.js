var request = require('request');
const url = "http://www.tuling123.com/openapi/api?key=de4ae9269c7438c33de5806562a35cac&info=";

module.exports = function(req, res){

  var _da;
    req.on("data",function(data){
        _da = data.toString("utf-8");
    });

    req.on("end",function(){
        var Content = getXMLNodeValue('Content',_da);
        var body = content_pattern.exec(Content);
        if( body.length === 2){
            // search keyword = body[1] by tuning API
            url = url + body[1];
        } 
        var options = {
            url: url,
            method: "GET"
        };
        request(options,function(error,response,data){
           if(data){
              var xml = replyMessage(_da, data);
              res.send(xml);
           }else {
              res.send("Error when calling Tuning API: " + error);
              console.log(error);
           }
        });
    });
};