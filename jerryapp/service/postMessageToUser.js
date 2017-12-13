var config = require("../../config.js");
var request = require("request");

function printObject(oData){
	for( var a in oData){
		console.log("key: " + a);
		console.log("value: " + oData[a]);
		if( typeof oData[a] === "object"){
			printObject(oData[a]);
		}
	}
}

function sendWCMeaasge(toUser,sMessage){
	console.log("begin to send message to user: " + toUser + " with message: " + sMessage);
    var options = {
            url:"https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" +
            config.access_token, 
            method: "POST",
            json:true,
            headers: {
            	"content-type": "application/json"},
            body:{
              "touser":toUser,
              "msgtype":"text",
              "text":
              {
                   "content":sMessage
              }
                }
          };
      request(options,function(error,response,data){
      	console.log("error? " + error);
        console.log("response: " + response);
        console.log("data: " + data);
        console.log("response...............................................");
        printObject(response);
        console.log("data.....................................................");
        printObject(data);
      });
  }

module.exports = sendWCMeaasge;
