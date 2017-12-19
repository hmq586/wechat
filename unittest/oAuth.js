var config = require("../config.js");
var request = require('request');

function printObject(oData){
  console.log("Jerry type: " + typeof oData);
  for( var a in oData){
    console.log("key: " + a);
    console.log("value: " + oData[a]);
    if( typeof oData[a] === "object"){
      printObject(oData[a]);
    }
  }
}

function getAccessToken() {
  var code = "081zOWZF1BypQ10m2Y0G1jqXZF1zOWZR";

  var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + 
  config.testAccountAppid + "&secret=" + config.testAccountSecret + "&code=" + code + "&grant_type=authorization_code";
  console.log("url sent: " + url);

  var getTokenOptions = {
        url: url,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json"
        }
  };

  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      requestC(getTokenOptions,function(error,response,body){
       debugger;
       console.log("get response");
       if(error){
          console.log("in reject: " + error);
          reject({message: error});
          return;
       }
      resolve(body.access_token);
      }); // end of requestC
     });
} 

function getUserinfo(access_token){
    console.log("access token: " + access_token);
}

getAccessToken().then(function(access_token) {
  getUserinfo(access_token);
});
