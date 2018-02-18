var http      = require('http');
var httpProxy = require('http-proxy');
var exec = require('child_process').exec;
var request = require("request");
var Random = require('random-js');
var heartbeats = require('heartbeats');

var heart = heartbeats.createHeart(1000);

var STABLE = '111.111.111.144';
var CANARY = '111.111.111.155';
var BACKUPCANARY = '111.111.111.155';

var TARGET = STABLE;

var rand = 
{
    random : new Random(Random.engines.mt19937().seed(0)),
    
    seed: function (kernel)
    {
        rand.random = new Random(Random.engines.mt19937().seed(kernel));
    }
};

rand.seed(0);

var infrastructure =
{
  setup: function()
  {
    // Proxy.
    var options = {};
    var proxy   = httpProxy.createProxyServer(options);

    var server  = http.createServer(function(req, res)
    {

      //40% of the time, route traffic to CANARY, otherwise route to STABLE
      if(rand.random.bool(0.4)){
        //console.log('40%')
        TARGET = CANARY;
      } else {
        TARGET = STABLE;
        //console.log('60%')
      }

      proxy.web( req, res, {target: TARGET } );
    });
    server.listen(80);


    //Will use this to check for 503 from Canary which means high cpu ALERT
    //every 3 beats aka every 3 seconds
    heart.createEvent(3, function(count, last){
      var requestURL = BACKUPCANARY + ':3002/api/study/listing';
      var options = 
      {
       url: requestURL,
      };
      request(options, function (error, res, body) {
          if (error)
          {
            //console.log(error);
          } else
          {
            console.log('STATUS of CANARY: ' + res.statusCode);
            //console.log('Current: ' + TARGET); 
            if (res.statusCode == 503)
            {
              console.log('503 hit, therefore canary has too high cpu load right now, do not direct to it anymore');
              CANARY = STABLE;
            } else
            {
              console.log('canary cpu load has gone back down, we can start to direct to it again');
              CANARY = BACKUPCANARY;
            } 
          } 
      });
    });
  },

  teardown: function()
  {
    exec('forever stopall', function()
    {
      console.log("infrastructure shutdown");
      process.exit();
    });
  },
}

infrastructure.setup();

// Make sure to clean up.
process.on('exit', function(){infrastructure.teardown();} );
process.on('SIGINT', function(){infrastructure.teardown();} );
process.on('uncaughtException', function(err){
  console.error(err);
  infrastructure.teardown();} );
