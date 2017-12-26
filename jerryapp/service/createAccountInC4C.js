var config = require("../../config.js");
var request = require('request');
var postWCMessage = require("./postMessageToUser.js");
var createSocialMediaProfile = require("./createSocialMediaProfile.js");

var url = config.individualCustomerurl + '?$top=1';

var getTokenOptions = {
        url: url,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json",
            'Authorization': 'Basic ' + new Buffer(config.credential_odata).toString('base64'),
            "x-csrf-token" :"fetch"
        }
};

function getToken() {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      console.log("Step1: get csrf token via url: " + url );

      requestC(getTokenOptions,function(error,response,body){
       var csrfToken = response.headers['x-csrf-token'];
       if(!csrfToken){
          reject({message:"token fetch error"});
          return;
       }
       console.log("Step1: csrf token got: " + csrfToken);
       resolve(csrfToken);
      }); 
     });
}

function _createIndividualCustomer(token, fromUserName){
  console.log("Step1: try to create individual account for user: " + fromUserName);
	return new Promise(function(resolve, reject){
		var oPostData = {
			"FirstName":"Wechat",
 			"LastName":fromUserName,
 		  "RoleCode": "CRM000",
 		  "CountryCode": "US",
 		  "StatusCode": "2",
      "Mobile":"028",
      "Phone":"139"
		};
		var requestC = request.defaults({jar: true});
        var createOptions = {
              url: config.individualCustomerurl,
              method: "POST",
              json:true,
              headers: {
                  "content-type": "application/json",
                  'x-csrf-token': token
              },
              body:oPostData
        };
        requestC(createOptions,function(error,response,data){
            if(error){
                reject(error.message);
            }else {
               resolve(data);
            }
        });
	});
}

/* Step1: create individual account, get an internal customer ID
   Step2: create Social Media user profile, get a profile id
   Step3: bind the profile created in step two with customer ID got from step one
*/

module.exports = function createAccount(fromUserName){
  getToken().then(function(token) {
  _createIndividualCustomer(token, fromUserName).then(function(data){
    var customerID = data.d.results.CustomerID
    var message = "Individual Account created: " + customerID;
    console.log(message);
    postWCMessage(fromUserName, message);

    // step2: create social media user profile
    createSocialMediaProfile().then(function(oCreatedProfile){
        console.log("created id: " + oCreatedProfile.id);
        console.log("uuid: " + oCreatedProfile.uuid);
    });
  });
});
};




