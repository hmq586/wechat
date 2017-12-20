var redis = require("redis"),
    // client = redis.createClient(process.env.REDIS_URL); // by default localhost will be used!!
	client = redis.createClient("redis://h:p99a8dd0d92871b9ffe7a026e6d70beecd7f2a0e743fa1e2840a58ce048f41c4a@ec2-34-237-158-248.compute-1.amazonaws.com:9479"); // by default localhost will be used!!

client.on("error", function (err) {
    console.log("Trouble......... Redis startup failed: " + err);
});

function insertIntoList(sOpenId, oElement){
	client.lpush(sOpenId, oElement);
}

function clearList(sOpenId){
	client.del(sOpenId, function(error, count){
    	if(error){
        	console.log("error when clear list:" + error);
    	}
    	console.log("list clear successfully: " + count); 
	});
}

function getListContent(sOpenId){
	client.lrange(sOpenId, 0, -1, function(err, reply) {
    	console.log("content for list: " + sOpenId + " **********: " + reply);
	});
}

var oRedisClient = {
	insert: insertIntoList,
	clear: clearList,
	getList: getListContent
};

module.exports = oRedisClient;
