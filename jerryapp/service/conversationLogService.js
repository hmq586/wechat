var getXMLNodeValue = require("../tool/xmlparse.js");
var formattedValue = require("../tool/formatValue.js");
var redisClient = require("./redisClient.js");
var config = require("../../config.js");

function logConversation(wholeContent, question, answer){
	var fromUserId = formattedValue(getXMLNodeValue('FromUserName', wholeContent));
	var toUserId = formattedValue(getXMLNodeValue('ToUserName', wholeContent));
	var fromUserName = config.userMap[fromUserId] || fromUserId;
	var toUserName = config.userMap[toUserId] || toUserId;
	redisClient.insert(toUserId, objectToString(fromUserName, toUserName, question, answer));
};

function objectToString(fromUserName, toUserName, question, answer){
	var record = {
		"from": fromUserName,
		"to": toUserName,
		"question": question,
		"answer": answer
	};

	return JSON.stringify(record); 
}

function getList(sToUserOpenId){
	return redisClient.getList(sToUserOpenId);
}

function deleteLog(sToUserOpenId){
	redisClient.clearList(sToUserOpenId);
}

var oService = {
	log: logConversation,
	getLog: getList,
	deleteLog: deleteLog
}

module.exports = oService;