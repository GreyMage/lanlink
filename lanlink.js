var config = require('./config');
var scanner = require('./sub/scanner')(config);
var hostedit = require('./sub/hostedit')(config);

scanner.on("found",function(rinfo){
	hostedit.addEntry(rinfo);
});