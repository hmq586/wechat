var request = require('request');
var getXMLNodeValue = require("../tool/xmlparse.js");
var replyMessage = require("../tool/replyMessage.js");
const content_pattern = /<!\[CDATA\[(.*)\]\]>/;

const url = "http://www.tuling123.com/openapi/api?key=de4ae9269c7438c33de5806562a35cac&info=";

module.exports = function(req, res){

  var _da;
    req.on("data",function(data){
        _da = data.toString("utf-8");
    });

    req.on("end",function(){
        var Content = getXMLNodeValue('Content',_da);
        var body = content_pattern.exec(Content);
        var requesturl = "";
        if( body.length === 2){
            // search keyword = body[1] by tuning API
            requesturl = url + body[1];
        } 
        var options = {
            url: requesturl,
            method: "GET"
        };
        console.log("request sent to Tuning API: " + url);
        request(options,function(error,response,data){
           if(data){
            console.log("response from tuning: " + data);
              var text = JSON.parse(data).text;
              var xml = replyMessage(_da, text);
              res.send(xml);
           }else {
              res.send("Error when calling Tuning API: " + error);
              console.log(error);
           }
        });
    });
};