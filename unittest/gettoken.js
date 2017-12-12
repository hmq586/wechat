var config = require("../config.js");
var request = require('request');

var getTokenOptions = {
        url: config.individualCustomerurl,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json",
            'Authorization': 'Basic ' + new Buffer(config.credential).toString('base64'),
            "x-csrf-token" :"fetch"
        }
};

function getToken() {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      requestC(getTokenOptions,function(error,response,body){
       var csrfToken = response.headers['x-csrf-token'];
       if(!csrfToken){
          reject({message:"验证令牌错误"});
          return;
       }
       resolve(csrfToken);
      }); // end of requestC
     });
}

getToken().then(function(token){
	console.log("token received: " + token);
});
