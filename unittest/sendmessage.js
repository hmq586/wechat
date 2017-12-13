var config = require("../config.js");
var request = require('request');

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
    var fuck = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=4_Kxv-HMtXK1375uwwkOfMfh-KvtkEO4blgZe47z5Dh7sIRgqT9zi0gO22c6USJZel9TaX9jbNYB5cKfsZyoAprIx89laeoS9hLwOEUhhjg5OujcYwElSEnKUi-psPQMbAHADEA";
    var options = {
            url: //"https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" +
            // encodeURI(config.access_token),
            fuck, 
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
        debugger;
        console.log("Status message: " + response.statusMessage);
        console.log("Data: " + data.errmsg);
      });
  }

  sendWCMeaasge(config.testAccount, "Jerry22");