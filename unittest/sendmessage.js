var sendMessage = require("../jerryapp/service/postMessageToUser.js");
var config = require("../config.js");

sendMessage(config.testAccount, "Dear customer, thank you for contact C4C support center. We have received your message ID 59189 and currently working on it.");