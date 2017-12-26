
var parseString = require('xml2js').parseString;
var xml = '<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/"><soap-env:Header/><soap-env:Body><n0:SocialMediaActivityBundleMaintainConfirmationsync xmlns:n0="http://sap.com/xi/SAPGlobal20/Global" xmlns:prx="urn:sap.com:proxy:QXL:/1SAI/TAE2C89B62935E25D62C8AE:804"><SocialMediaActivity><UUID>00163e0b-d0a3-1ee7-bac1-0812dcf198e2</UUID><ID>59226</ID><ChangeStateID>                 20171226064442.5352610</ChangeStateID></SocialMediaActivity></n0:SocialMediaActivityBundleMaintainConfirmationsync></soap-env:Body></soap-env:Envelope>';

/*parseString(xml, function (err, result) {
    console.log(result);
    var obj = JSON.parse(result);
    // console.log("id: " + obj.ID);
});*/


