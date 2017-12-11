var request = require('request');
var getXMLNodeValue = require("../tool/xmlparse.js");
var replyMessage = require("../tool/replyMessage.js");
var formattedValue = require("../tool/formatValue.js");

const url = "http://www.tuling123.com/openapi/api?key=de4ae9269c7438c33de5806562a35cac&info=";

module.exports = function(wholecontent, question, res){

  var voice = getXMLNodeValue("Recognition", wholecontent);
  var requesturl = "";
  console.log("Value from Recognition: " + voice);
  if( !!voice ){
     requesturl = url + encodeURI(voice);
  }
  else {
     var formatted = formattedValue(question);
     console.log("use Tuning API with key: " + formatted);
     requesturl = url + encodeURI(formatted);
  } 

  var options = {
            url: requesturl,
            method: "GET"
        };
  console.log("request sent to Tuning API: " + requesturl);
  request(options,function(error,response,data){
  if(data){
     console.log("response from tuning: " + data);
     var text = JSON.parse(data).text;
     var xml = replyMessage(wholecontent, text);
     res.send(xml);
  } else {
       res.send("Error when calling Tuning API: " + error);
       console.log(error);
     }
  });
};
