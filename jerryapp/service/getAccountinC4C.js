var config = require("../../config.js");
var request = require('request');

function getAccount(uuid){
  console.log("begin to read uuid: " + uuid);
  _getAccount(uuid);
}

function _getAccount(uuid) {
  var AccountBOguid = uuid;
  var detailODataUrl = config.indivudualCustomerNewurl;
  var parentID = 'ParentObjectID eq \'' + AccountBOguid + '\'';
  detailODataUrl = detailODataUrl + encodeURI(parentID);
  var getOptions = {
        url: detailODataUrl,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json"
        }
  };
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      requestC(getOptions,function(error,response,body){
       console.log("Body: " + body);
       resolve(body);
      }); // end of requestC
     });
}