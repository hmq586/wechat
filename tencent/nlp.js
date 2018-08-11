
var md5 = require('md5');

var app_id = "2107823355";
var time_stamp = new Date();
var nonce_str = "20e3408a79";
var text = "腾讯人工智能";
var app_key = "LHGNH0usjUTRRRSA";

var input = "app_id=" + app_id + "&nonce_str=" + nonce_str + "&text=" + encodeURI(text)  
  + "&time_stamp=" + time_stamp + "&app_key=" + app_key;

var upper = md5(input).toUpperCase();
console.log(upper);


