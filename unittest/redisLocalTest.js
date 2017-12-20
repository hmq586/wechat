var redis = require("redis"),
    client = redis.createClient("redis://h:p99a8dd0d92871b9ffe7a026e6d70beecd7f2a0e743fa1e2840a58ce048f41c4a@ec2-34-237-158-248.compute-1.amazonaws.com:9479"); // by default localhost will be used!!

client.on("error", function (err) {
    console.log("Redis failed! Error " + err);
});

client.set("some key", "i042416");
client.get("some key", function(err, reply) {
    // reply is null when the key is missing
    console.log("Jerry Redis practice: ******************** " + reply);
    console.log("end DB!");
	client.end(true);
});


/*
client.lpush('list', 'key_0');
        client.lpush('list', 'key_1');
        */