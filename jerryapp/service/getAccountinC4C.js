var config = require("../../config.js");
var request = require('request');

function getAccount(uuid,res){
  console.log("begin to read uuid: " + uuid);
  _getAccount(uuid).then(function(body){
    console.log("body in getAccount: " + body);
    res.send("Jerry..............");
  });
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
      console.log("request with url: " + detailODataUrl);
      requestC(getOptions,function(error,response,body){
       console.log("Body: " + body);
       resolve(body);
      }); // end of requestC
     });
}

module.exports = getAccount;