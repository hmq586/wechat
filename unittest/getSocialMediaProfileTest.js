var getSocialProfile = require('../jerryapp/service/getSocialMediaUserProfile.js');

getSocialProfile("6066").then(function(accountID){
	console.log("id:" + accountID );
	});

