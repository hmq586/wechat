var request = require('request');
var config = require("../config.js");

var userProfileId = "6070";
var text = "Jerry";
var ocreateSocialMediaActivityOptions = {
        url: "https://qxl-cust233.dev.sapbydesign.com/sap/bc/srt/scs/sap/managesocialmediaactivityin",
        method: "POST",
        json:false,
        headers: {
            "content-type": "text/xml",
            'Authorization': 'Basic ' + new Buffer(config.credential_qxl).toString('base64')
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global"><soapenv:Header/><soapenv:Body><glob:SocialMediaActivityBundleMaintainRequestsync>'
                        +'<SocialMediaActivity>'
                        +'<SocialMediaMessageID>'+"I042419"+'</SocialMediaMessageID>'
                        +'<SocialMediaUserProfileID>'+userProfileId+'</SocialMediaUserProfileID>'
                        +'<SocialMediaActivityProviderID >WechatTest</SocialMediaActivityProviderID>'
                        +'<InteractionContent ><Text>'+text+'</Text></InteractionContent>'
                        +'</SocialMediaActivity>'
                        +'</glob:SocialMediaActivityBundleMaintainRequestsync></soapenv:Body></soapenv:Envelope>'
};

function createMessage() {
  return new Promise(function(resolve,reject){
      request(ocreateSocialMediaActivityOptions,function(error,response,body){
       var soapreg = /.*<ID>(.*)<\/ID>.*/;
	   var soapresult = soapreg.exec(body);
	   if( soapresult.length === 2){
	   		console.log("created id: " + soapresult[1]);
	   		resolve(soapresult[1]);
	   }
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

createMessage();
console.log("done");