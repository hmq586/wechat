var replyMessage = require("../tool/replyMessage.js");

module.exports = function(content, res){

  var reply = "Add by Jerry: " + content; 
  var xml = replyMessage(_da, Content);
  res.send(xml);
};