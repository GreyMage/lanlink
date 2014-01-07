var hostedit = {}
var util = require("util");
var os = require("os");
var fs = require("fs");
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};

hostedit.addEntry = function(ops){
	//ops contains address and name.
	fs.readFile(hostedit.config.hosts[os.type()], function (err, data) { data=data.toString();
		data = data.toString().split("\n");
		var dout = "";
		var found = false;
		var llEntryRegex = /^\s*([\d\.]+)\s+(\S+)\s+#LANLINK/;

		if (err) throw err;
		for(var line in data){
			line = data[line].trim();
			var match = line.match(llEntryRegex);
			if(match){
				if(match[2] == ops.name){
					found = true;
					// Check if IP Matches Given. 
					if(match[1] == ops.address){ return; /* No worry. */ }
					dout += (ops.address+" "+ops.name+" #LANLINK")+"\n";
				} else {
					dout += (match[1]+" "+match[2]+" #LANLINK")+"\n";
				}
			} else {
				dout += line+"\n";
			}
		}
		
		if(!found){
			dout += (ops.address+" "+ops.name+" #LANLINK")+"\n";
		}
		
		fs.writeFile(hostedit.config.hosts[os.type()], dout, function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("Hosts Updated");
			}
		}); 
	});
}

module.exports = function(config) {
	hostedit.config = config;
	return hostedit;
};