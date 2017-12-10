var getXMLNodeValue = require("../tool/xmlparse.js");
var replyMessage = require("../tool/replyMessage.js");
const content_pattern = /<!\[CDATA\[(.*)\]\]>/;

module.exports = function(req, res){

  var _da;
    req.on("data",function(data){
      /*微信服务器传过来的是xml格式的，是buffer类型，因为js本身只有字符串数据类型，
      所以需要通过toString把xml转换为字符串*/
        _da = data.toString("utf-8");
    });

    req.on("end",function(){
        var Content = getXMLNodeValue('Content',_da);
        var body = content_pattern.exec(Content);
        if( body.length === 2){
            Content = "Add by Jerry: " + body[1];
        } 
        var xml = replyMessage(_da, Content);
        res.send(xml);
    });
};