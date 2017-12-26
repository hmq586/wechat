var request = require('request');
var config = require("../../config.js");

var openId = "6070";
var firstname = "Jerry";
var lastname = "Wang";

var ocreateSocialMediaProfileOptions = {
        url: "https://qxl-cust233.dev.sapbydesign.com/sap/bc/srt/scs/sap/managesocialmediauserprofilein",
        method: "POST",
        headers: {
            "content-type": "text/xml",
            'Authorization': 'Basic ' + new Buffer(config.credential_qxl).toString('base64')
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global"><soapenv:Header/><soapenv:Body><glob:SocialMediaUserProfileBundleMaintainRequest_sync>'
                      +'<SocialMediaUserProfile>'
                      +'<SocialMediaUserCategoryCode>02</SocialMediaUserCategoryCode>'
                      +'<UserInformation >'
                      +'<SocialMediaUserAccountID>'+openId+'</SocialMediaUserAccountID>'
                      +'<SocialMediaChannelCode>905</SocialMediaChannelCode>'
                      +'<FamilyName>'+ lastname+'</FamilyName>'
                      +'<GivenName>'+ firstname+'</GivenName>'
                      +'</UserInformation>'
                      +'</SocialMediaUserProfile>'
                      +'</glob:SocialMediaUserProfileBundleMaintainRequest_sync></soapenv:Body></soapenv:Envelope>'
              };

function createSocialMediaProfile() {
  return new Promise(function(resolve,reject){
      request(ocreateSocialMediaProfileOptions,function(error,response,body){
       var soapreg = /.*<ID>(.*)<\/ID>.*<UUID>(.*)<\/UUID>.*/;
	   var soapresult = soapreg.exec(body);
	   if( soapresult.length === 3){
        var createdProfile = {
          id: soapresult[1],
          uuid: soapresult[2]
        };
	   		resolve(createdProfile);
	   }
      }); 
     });
}

module.exports = createSocialMediaProfile;