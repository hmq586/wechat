const content_pattern = /<!\[CDATA\[(.*)\]\]>/;

module.exports = function(raw){
	var body = content_pattern.exec(raw);
    console.log("result size: " + body.length);
    if( body.length === 2){
        console.log("formatted value: " + body[1]);
        return body[1];
	} 
	return null;
};
