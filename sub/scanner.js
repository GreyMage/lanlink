var scanner = {}
var util = require("util");
var os = require("os");
scanner.howl = new Buffer("LANLINK=");
scanner.socket = require('dgram').createSocket("udp4");
scanner.events = require('events');
scanner.eventEmitter = new scanner.events.EventEmitter();
scanner.on = function(name,callback){scanner.eventEmitter.on(name,callback);}
scanner.scanThread = 0;

scanner.scan = function(){
	var toSend = new Buffer(scanner.howl + os.hostname());
	scanner.socket.send(toSend, 0, toSend.length, scanner.config.net.port, scanner.config.net.broadcastIP, function(err, bytes) {
		scanner.eventEmitter.emit("send");
	});
}

scanner.socket.on("error", function (err) {
	console.log("server error:\n" + err.stack);
	scanner.eventEmitter.emit("error",err);
	scanner.socket.close();
});

scanner.socket.on("message", function (msg, rinfo) {
	if(msg.toString().indexOf(scanner.howl.toString()) !== 0) return;
	var ifs = os.networkInterfaces();
	for(var netinterface in ifs){
		for(var group in ifs[netinterface]){
			if(rinfo.address == ifs[netinterface][group].address){
				return;
			}
		}
	}
	scanner.eventEmitter.emit("found", {address:rinfo.address,name:msg.toString().substring(scanner.howl.toString().length)});
});

scanner.socket.on("listening", function () {
	scanner.eventEmitter.emit("listening");
});

module.exports = function(config) {
	scanner.config = config;
	scanner.socket.bind(scanner.config.net.port,function(){
		scanner.socket.setBroadcast(true);
		scanner.scanThread = setInterval(function(){
			scanner.scan();
		},scanner.config.time.interval);
		scanner.scan();
	});
	return scanner;
};