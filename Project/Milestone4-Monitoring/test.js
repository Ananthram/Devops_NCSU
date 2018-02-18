var request = require('sync-request');
var fs      = require('fs')

var args = process.argv.slice(2);

	if( args.length == 0 )
	{
		args = ["/api/toggleFeature"]
	}


var endPoint = args[0];

for(var i = 0; i < 10000; i++) {
    var res1 = request('GET', 'http://104.131.69.93/' + endPoint);
}
