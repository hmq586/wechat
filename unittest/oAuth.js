var config = require("../config.js");
var request = require('request');

var code = "021ko0iC0qyaeg2n5RhC02iIhC0ko0iT";
var appid = "";
var secret = "";

// get access token
var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + 
config.testAccountAppid + "&secret=" + config.testAccountSecret + "&code=" + code + "&grant_type=authorization_code";
console.log("url sent: " + url);

var getTokenOptions = {
        url: code,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json"
        }
};

function printObject(oData){
  for( var a in oData){
    console.log("key: " + a);
    console.log("value: " + oData[a]);
    if( typeof oData[a] === "object"){
      printObject(oData[a]);
    }
  }
}

function getToken() {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      requestC(getTokenOptions,function(error,response,body){
       debugger;

       printObject(body.d.results[0]);

      }); // end of requestC
     });
} 

getToken();