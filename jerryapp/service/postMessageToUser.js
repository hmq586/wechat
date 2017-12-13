var config = require("../../config.js");
var request = require("request");

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
      });
  }

module.exports = sendWCMeaasge;
