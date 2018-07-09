var config = require("../config.js");
var request = require('request');

var getTokenOptions = {
        url: "https://my306768.vlab.sapbydesign.com/sap/c4c/dis",
        method: "GET",
        headers: {
            'Authorization': 'Basic ' + new Buffer("WANGJERRYE7000198:Sap12345").toString('base64')
        }
};

function getToken() {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      console.time("Remote");
      requestC(getTokenOptions,function(error,response,body){
        console.log("response body: " + body);
        console.timeEnd("Remote");
       resolve(response);
      }); 
     });
}

function printObject(oData){
	for( var a in oData){
		console.log("key: " + a);
		console.log("value: " + oData[a]);
		if( typeof oData[a] === "object"){
			printObject(oData[a]);
		}
	}
}

getToken().then(function(response) {
	   // printObject(response);
});

