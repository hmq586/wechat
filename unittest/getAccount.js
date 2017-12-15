var config = require("../config.js");
var request = require('request');

var getTokenOptions = {
        url: "https://my500203.c4c.saphybriscloud.cn/sap/c4c/odata/cust/v1/zindividualcustomer/CustomerCommonCollection?$filter=ParentObjectID%20eq%20%2700163E20C9511EE7B8975BD4AB3F60C0%27",
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json",
            'Authorization': 'Basic ' + new Buffer(config.credential).toString('base64')
        }
};

function getToken() {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      requestC(getTokenOptions,function(error,response,body){
       debugger;
       resolve("ok");
      }); // end of requestC
     });
}

getToken().then(function(token) {
	console.log("token received: " + token);
});

